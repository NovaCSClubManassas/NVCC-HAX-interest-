import { Cpu, MapPin, Leaf, Users } from 'lucide-react';
import { COLORS, FONTS, GRADIENTS } from '../tokens';
import { TRACKS } from '../data/tracks';

const ICONS = {
  cpu: Cpu,
  mapPin: MapPin,
  leaf: Leaf,
  users: Users,
};

const sectionTitleStyle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  marginBottom: '3rem',
  textAlign: 'center',
  fontFamily: FONTS.display,
  fontWeight: 700,
  background: GRADIENTS.sectionHeading,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export default function ThemeCardGrid() {
  return (
    <section
      style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <h2 className="fade-up" style={sectionTitleStyle}>
        Tracks
      </h2>
      <p
        className="fade-up"
        style={{
          textAlign: 'center',
          color: '#ffffffaa',
          maxWidth: '720px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.65,
          fontFamily: FONTS.body,
        }}
      >
        Pick a track that fits your skills — every path leads to building something you can show off at judging.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}
      >
        {TRACKS.map((card, idx) => {
          const Icon = ICONS[card.iconKey] || Cpu;
          return (
            <div
              key={card.id}
              className="fade-up hover-lift"
              style={{
                padding: '1px',
                borderRadius: '14px',
                background: `linear-gradient(145deg, ${COLORS.gold}99, ${COLORS.brightGreen}66, ${COLORS.darkGreen}aa)`,
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <div
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRadius: '13px',
                  background: `linear-gradient(160deg, ${COLORS.dark}f2, ${COLORS.darkGreen}dd)`,
                  border: `1px solid ${COLORS.green}40`,
                  minHeight: '100%',
                  boxShadow: `inset 0 1px 0 ${COLORS.gold}22`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${COLORS.darkGreen}99`,
                      border: `1px solid ${COLORS.gold}55`,
                      color: COLORS.gold,
                    }}
                  >
                    <Icon size={28} strokeWidth={1.75} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: COLORS.brightGreen,
                        marginBottom: '0.2rem',
                        fontFamily: FONTS.body,
                      }}
                    >
                      {card.tagline}
                    </p>
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        margin: 0,
                        color: COLORS.lightGold,
                        fontFamily: FONTS.display,
                        fontWeight: 700,
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>
                <p style={{ color: '#ffffffcc', lineHeight: 1.65, margin: 0, fontFamily: FONTS.body }}>{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
