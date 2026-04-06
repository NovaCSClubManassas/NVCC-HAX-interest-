import { Laptop, Wrench, Cpu, LayoutGrid, Medal } from 'lucide-react';
import { COLORS, FONTS, GRADIENTS } from '../tokens';
import { TRACKS } from '../data/tracks';

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

const iconStroke = 1.75;

function TrackIcon({ iconKey }) {
  const gold = COLORS.gold;
  if (iconKey === 'hardware') {
    return (
      <span className="track-icon-inner" aria-hidden style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Wrench size={20} strokeWidth={iconStroke} color={gold} />
        <Cpu size={20} strokeWidth={iconStroke} color={gold} />
      </span>
    );
  }
  if (iconKey === 'laptop') {
    return <Laptop className="track-icon-inner" size={28} strokeWidth={iconStroke} color={gold} aria-hidden />;
  }
  if (iconKey === 'scratchBlocks') {
    return <LayoutGrid className="track-icon-inner" size={28} strokeWidth={iconStroke} color={gold} aria-hidden />;
  }
  if (iconKey === 'medal') {
    return <Medal className="track-icon-inner" size={28} strokeWidth={iconStroke} color={gold} aria-hidden />;
  }
  return <Laptop className="track-icon-inner" size={28} strokeWidth={iconStroke} color={gold} aria-hidden />;
}

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
        {TRACKS.map((card, idx) => (
          <div
            key={card.id}
            className="fade-up hover-lift track-card"
            style={{
              padding: '1px',
              borderRadius: '14px',
              background: `linear-gradient(145deg, ${COLORS.gold}99, ${COLORS.brightGreen}66, ${COLORS.darkGreen}aa)`,
              animationDelay: `${idx * 0.05}s`,
              transition: 'transform 0.35s ease, box-shadow 0.35s ease',
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
                  className="track-icon-well"
                  style={{
                    width: '52px',
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
                  <TrackIcon iconKey={card.iconKey} />
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
        ))}
      </div>

      <style>{`
        .track-card {
          box-shadow: 0 4px 24px rgba(5, 15, 10, 0.45);
        }
        .track-card:hover {
          transform: scale(1.02);
          box-shadow:
            0 12px 40px rgba(212, 175, 55, 0.2),
            0 8px 32px rgba(45, 134, 89, 0.18);
        }
        .track-icon-well {
          overflow: visible;
        }
        .track-icon-inner {
          animation: trackIconFloat 2.8s ease-in-out infinite;
        }
        @keyframes trackIconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .track-card {
            transition: none;
          }
          .track-card:hover {
            transform: none;
          }
          .track-icon-inner {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
