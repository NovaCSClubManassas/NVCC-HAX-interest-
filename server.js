// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const escapeHtml = require('escape-html'); // Add this for sanitization
const { body, validationResult } = require('express-validator'); // Add for better validation
require('dotenv').config();

// Required env vars - throw if missing
const requiredEnv = ['PORT', 'DATA_FILE', 'ADMIN_KEY', 'ADMIN_EMAIL', 'FROM_EMAIL', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'ALLOWED_ORIGIN'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) throw new Error(`${key} environment variable is required.`);
});

const PORT = parseInt(process.env.PORT, 10);
const DATA_FILE = process.env.DATA_FILE;
const ADMIN_KEY = process.env.ADMIN_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

// Make sure data dir exists
await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

const app = express();
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      // Customize as needed for your frontend
    },
  },
}));
app.use(express.json({ limit: '50kb' })); // Smaller limit for safety

// Rate limit - stricter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use('/api/', apiLimiter);

// CORS - strict, no wildcard
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Transporter with verification
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection failed:', error);
    process.exit(1); // Fail fast if email can't be sent
  } else {
    console.log('SMTP ready');
  }
});

// Validation middleware for sponsor
const validateSponsor = [
  body('company').trim().notEmpty().escape(),
  body('contactName').trim().notEmpty().escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('phone').trim().optional().escape(),
  body('message').trim().optional().escape(),
  body('level').trim().optional().isIn(['bronze', 'silver', 'gold', 'platinum']).default('bronze'),
];

// POST endpoint
app.post('/api/sponsors', validateSponsor, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, error: 'Invalid payload', details: errors.array() });
  }

  try {
    const payload = {
      company: req.body.company,
      contactName: req.body.contactName,
      email: req.body.email,
      phone: req.body.phone || '',
      message: req.body.message || '',
      level: req.body.level,
      createdAt: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent') || '',
    };

    // Append as NDJSON
    const line = JSON.stringify(payload) + '\n';
    await fs.appendFile(DATA_FILE, line, 'utf8');

    // Send email
    const mailOptions = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `NVCC HAX Sponsor Inquiry: ${escapeHtml(payload.company)}`,
      text: `
New sponsor inquiry:
Company: ${payload.company}
Contact: ${payload.contactName}
Email: ${payload.email}
Phone: ${payload.phone}
Level: ${payload.level}
Message: ${payload.message}
Received at: ${payload.createdAt}
`,
      html: `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
<p><strong>Contact:</strong> ${escapeHtml(payload.contactName)}</p>
<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
<p><strong>Level:</strong> ${escapeHtml(payload.level)}</p>
<p><strong>Message:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, '<br/>')}</p>
<p><em>Received at: ${escapeHtml(payload.createdAt)}</em></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Sponsor email sent for', payload.company);

    return res.json({ ok: true, message: 'Thanks — we received your submission.' });
  } catch (err) {
    console.error('Error in sponsor submission:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// GET endpoint - admin only, header key, stream response
app.get('/api/sponsors', async (req, res) => {
  const key = req.get('X-Admin-Key');
  if (!key || key !== ADMIN_KEY) return res.status(401).json({ ok: false, error: 'Unauthorized' });

  try {
    const exists = await fs.access(DATA_FILE).then(() => true).catch(() => false);
    if (!exists) return res.json({ ok: true, data: [] });

    // Stream the file for large data
    res.setHeader('Content-Type', 'application/json');
    const readStream = require('fs').createReadStream(DATA_FILE, 'utf8');
    let data = [];
    let buffer = '';

    readStream.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop(); // Keep incomplete line
      lines.filter(Boolean).forEach((l) => {
        try {
          data.push(JSON.parse(l));
        } catch (e) {
          data.push({ raw: l, parseError: e.message });
        }
      });
    });

    readStream.on('end', () => {
      if (buffer) {
        try {
          data.push(JSON.parse(buffer));
        } catch (e) {
          data.push({ raw: buffer, parseError: e.message });
        }
      }
      res.json({ ok: true, data });
    });

    readStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).json({ ok: false, error: 'Failed to read data' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// For HTTPS in production, use a reverse proxy like Nginx or add:
// const https = require('https');
// const sslOptions = { key: await fs.readFile('key.pem'), cert: await fs.readFile('cert.pem') };
// https.createServer(sslOptions, app).listen(PORT, () => { console.log(`HTTPS on ${PORT}`); });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});