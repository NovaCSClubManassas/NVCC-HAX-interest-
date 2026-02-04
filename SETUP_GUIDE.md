# NVCC HAX - Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Download & Extract
Download the project files and extract them to a folder.

### Step 2: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Your site will open at `http://localhost:3000`

### Step 4: Customize Content

#### Update URLs (REQUIRED)
Open `src/App.jsx` and search for:
- `https://forms.google.com/your-interest-form` - Replace with your interest form URL
- `https://forms.google.com/your-judge-form` - Replace with your judge form URL  
- `https://discord.gg/your-discord` - Replace with your Discord invite
- `https://instagram.com/your-instagram` - Replace with your Instagram handle

#### Update Event Details
Search for these sections in `src/App.jsx`:
- **Date & Time**: Line ~366 - Update "March 15-16, 2025"
- **Location**: Line ~367 - Update "NVCC Manassas Campus"
- **Admin Password**: Line ~84 - Change from "nighthawks2024"

#### Add Your Logo
Replace the logo placeholder (around line ~242) with your actual logo image:
```javascript
<img 
  src="/nighthawks-logo.png" 
  alt="NVCC Nighthawks Logo"
  style={{
    width: '200px',
    height: '200px',
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))'
  }}
/>
```

Place `nighthawks-logo.png` in the `public/` folder.

## 🌐 Deploy to Production

### Option A: Vercel (Easiest)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Done! Your site is live.

### Option B: Netlify
1. Build your site: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag & drop the `dist` folder
4. Your site is live!

## 📧 Setup Email Notifications (Sponsor Form)

### Using EmailJS (Free, No Backend)
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an email template
3. Install: `npm install @emailjs/browser`
4. Update the sponsor form submission function in `src/App.jsx`

Example code:
```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = (e) => {
  e.preventDefault();
  
  emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    formData,
    'YOUR_PUBLIC_KEY'
  ).then(() => {
    alert('Thank you! We\'ll be in touch soon.');
  });
};
```

## 💬 Add Live Chat (Optional)

### Using Tawk.to (Free)
1. Sign up at [tawk.to](https://www.tawk.to/)
2. Get your widget code
3. Add it to `index.html` before `</body>`:

```html
<script type="text/javascript">
var Tawk_API=Tawk_API||{};
var Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_ID/YOUR_KEY';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
```

## 💾 Setup FAQ Database (Optional)

For persistent FAQ storage, use Supabase:

### Supabase Setup
1. Sign up at [supabase.com](https://supabase.com/)
2. Create a new project
3. Create a `faqs` table with columns:
   - `id` (uuid, primary key)
   - `question` (text)
   - `answer` (text)
   - `order` (integer)
   - `published` (boolean)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

4. Install: `npm install @supabase/supabase-js`
5. Update FAQ functions in `src/App.jsx` to use Supabase

## 📊 Add Google Analytics

1. Get your tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎨 Customize Colors

All colors are defined at the top of `src/App.jsx`:

```javascript
const COLORS = {
  darkGreen: '#0B4D2C',
  green: '#1A6B47', 
  brightGreen: '#2D8659',
  gold: '#D4AF37',
  lightGold: '#E8C547',
  dark: '#0A1F14',
  darker: '#050F0A',
};
```

## 🔒 Admin Panel

- Access: Click "Admin Login" in the navigation
- Default password: `nighthawks2024`
- Features: Add, edit, delete, publish/unpublish FAQs

**⚠️ For production:** Change the password and implement proper authentication!

## 📱 Testing

Test on multiple devices:
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS, Android)
- Tablet

## 🐛 Troubleshooting

### Site won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Images not loading
- Make sure images are in the `public/` folder
- Use paths like `/logo.png` (starting with `/`)

### Forms not submitting
- Check console for errors (F12 → Console)
- Verify Google Form URLs are correct
- Make sure forms are set to accept responses

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review comments in src/App.jsx
- Test admin password: `nighthawks2024`

---

**Ready to hack!** 🎉 Once you've customized the content, your NVCC HAX landing page is ready to go live.
