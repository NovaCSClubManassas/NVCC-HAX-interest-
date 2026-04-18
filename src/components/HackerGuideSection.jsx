import { BookOpen, ExternalLink } from 'lucide-react';
import { COLORS, FONTS, GRADIENTS } from '../tokens';

const sectionTitleStyle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  marginBottom: '2rem',
  textAlign: 'center',
  fontFamily: FONTS.display,
  fontWeight: 700,
  background: GRADIENTS.sectionHeading,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const cardBase = {
  padding: '2rem',
  background: `linear-gradient(135deg, rgba(10, 31, 20, 0.85), rgba(11, 77, 44, 0.75))`,
  border: `1px solid ${COLORS.green}60`,
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
};

export default function HackerGuideSection() {
  return (
    <section
      id="hacker-guide"
      style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}
    >
      <h2 className="fade-up" style={sectionTitleStyle}>
        Hacker Guide
      </h2>
      <div
        className="fade-up hover-lift"
        style={{
          ...cardBase,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: COLORS.gold }}>
          <BookOpen size={28} aria-hidden />
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, color: COLORS.lightGold, fontSize: '1.125rem' }}>
            Everything you need for event day
          </span>
        </div>
        <p style={{ color: '#ffffffcc', lineHeight: 1.65, fontFamily: FONTS.body, maxWidth: '560px' }}>
          Download the official info packet for schedule details, rules, logistics, and tips so you’re ready to build.
        </p>
        <a
          href="/hacker-guide.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift"
          style={{
            padding: '1rem 2rem',
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.lightGold})`,
            border: 'none',
            borderRadius: '8px',
            color: COLORS.darker,
            fontSize: '1.0625rem',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: FONTS.body,
          }}
        >
          Open Hacker Guide (PDF)
          <ExternalLink size={20} aria-hidden />
        </a>
      </div>
    </section>
  );
}
