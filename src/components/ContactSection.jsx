import { Mail, MapPin } from 'lucide-react';
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

export default function ContactSection() {
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 className="fade-up" style={sectionTitleStyle}>
        Contact
      </h2>
      <div
        className="fade-up hover-lift"
        style={{
          ...cardBase,
          display: 'grid',
          gap: '1.25rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: COLORS.gold, marginBottom: '0.5rem' }}>
            <Mail size={22} aria-hidden />
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, color: COLORS.lightGold }}>Social & chat</span>
          </div>
          <p style={{ color: '#ffffffcc', lineHeight: 1.65, fontFamily: FONTS.body }}>
            Discord is the best place for quick questions:{' '}
            <a
              href="https://discord.gg/RnJxNzae73"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.brightGreen }}
            >
              Join the server
            </a>
            . You can also reach us on{' '}
            <a
              href="https://www.instagram.com/novamacompsci/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.brightGreen }}
            >
              Instagram
            </a>{' '}
            and{' '}
            <a href="https://x.com/nvccmacsclub" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.brightGreen }}>
              X
            </a>
            .<p>Email us at <a href="mailto:nvccmacsclub@gmail.com" style={{ color: COLORS.brightGreen }}>nvccmacsclub@gmail.com</a>.</p>
          </p>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: COLORS.gold, marginBottom: '0.5rem' }}>
            <MapPin size={22} aria-hidden />
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, color: COLORS.lightGold }}>Where</span>
          </div>
          <p style={{ color: '#ffffffcc', lineHeight: 1.65, fontFamily: FONTS.body }}>
            NVCC Manassas Campus — event day check-in at the welcome block.
          </p>
        </div>
      </div>
    </section>
  );
}
