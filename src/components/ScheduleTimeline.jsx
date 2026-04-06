import { Clock } from 'lucide-react';
import { COLORS, FONTS, UI, GRADIENTS } from '../tokens';
import { SCHEDULE_DAY } from '../data/schedule';

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

export default function ScheduleTimeline() {
  const { dateLabel, summary, items } = SCHEDULE_DAY;

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h2 className="fade-up" style={sectionTitleStyle}>
        Schedule
      </h2>
      <p
        className="fade-up"
        style={{
          textAlign: 'center',
          color: '#ffffffaa',
          maxWidth: '720px',
          margin: '0 auto 2rem',
          lineHeight: 1.65,
          fontFamily: FONTS.body,
        }}
      >
        {summary}
      </p>

      <div className="fade-up">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.75rem',
            color: COLORS.gold,
          }}
        >
          <Clock size={28} aria-hidden />
          <span style={{ fontFamily: FONTS.display, color: COLORS.lightGold, fontSize: '1.15rem', fontWeight: 700 }}>
            {dateLabel}
          </span>
        </div>

        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item, idx) => (
            <li
              key={`${item.time}-${item.title}`}
              className="fade-up"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(6.5rem, 9rem) 1fr',
                gap: 'clamp(0.75rem, 3vw, 1.25rem)',
                marginBottom: idx === items.length - 1 ? 0 : '1.25rem',
                alignItems: 'stretch',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: '0.78rem',
                  color: COLORS.gold,
                  paddingTop: '0.85rem',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.35,
                  fontWeight: 700,
                }}
              >
                {item.time}
              </div>
              <div
                style={{
                  position: 'relative',
                  paddingLeft: '1rem',
                  borderLeft: `3px solid ${COLORS.brightGreen}66`,
                }}
              >
                <div
                  style={{
                    padding: '1rem 1.15rem',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${COLORS.dark}e6, ${COLORS.darkGreen}cc)`,
                    border: `1px solid ${COLORS.green}55`,
                    boxShadow: UI.shadowCard,
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 0.4rem',
                      fontSize: '1.05rem',
                      color: COLORS.lightGold,
                      fontFamily: FONTS.display,
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, color: '#ffffffcc', lineHeight: 1.65, fontSize: '0.95rem', fontFamily: FONTS.body }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
