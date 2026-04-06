import { useState, useEffect, useMemo } from 'react';
import { COLORS, FONTS } from '../tokens';

function getEventDate() {
  const iso = import.meta.env.VITE_EVENT_START_ISO ?? '2026-04-18T07:30:00-04:00';
  return new Date(iso);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function useUnitStyle() {
  return {
    minWidth: '4.25rem',
    padding: '0.75rem 0.65rem',
    borderRadius: '10px',
    border: `1px solid ${COLORS.gold}80`,
    background: `linear-gradient(145deg, ${COLORS.dark}ee, ${COLORS.darkGreen}cc)`,
    boxShadow: `0 0 24px ${COLORS.gold}18`,
  };
}

const labelStyleBase = {
  fontSize: '0.65rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginTop: '0.35rem',
  fontFamily: FONTS.body,
};

export default function EventCountdown() {
  const [tick, setTick] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const unitStyle = useUnitStyle();

  const eventDate = useMemo(() => getEventDate(), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const now = useMemo(() => Date.now(), [tick]);
  const remaining = Math.max(0, eventDate.getTime() - now);

  const formattedStart = useMemo(
    () =>
      eventDate.toLocaleString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      }),
    [eventDate]
  );

  const labelStyle = { ...labelStyleBase, color: '#ffffff99' };

  if (reduceMotion) {
    return (
      <p
        className="fade-up"
        style={{
          marginBottom: '2rem',
          color: '#ffffffcc',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          maxWidth: '640px',
          lineHeight: 1.5,
          animationDelay: '0.35s',
          fontFamily: FONTS.body,
        }}
      >
        <span style={{ color: COLORS.lightGold, fontFamily: FONTS.display, fontWeight: 700 }}>Event starts </span>
        {formattedStart}
      </p>
    );
  }

  const totalSec = Math.floor(remaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  const units =
    days > 0
      ? [
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Min' },
          { value: seconds, label: 'Sec' },
        ]
      : [
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Min' },
          { value: seconds, label: 'Sec' },
        ];

  return (
    <div
      className="fade-up"
      aria-live="polite"
      aria-atomic="true"
      style={{
        marginBottom: '2rem',
        animationDelay: '0.35s',
        width: '100%',
        maxWidth: '520px',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#ffffff88',
          marginBottom: '0.75rem',
          fontFamily: FONTS.display,
          fontWeight: 700,
        }}
      >
        {remaining <= 0 ? 'Event day' : 'Countdown'}
      </p>
      {remaining <= 0 ? (
        <p style={{ color: COLORS.lightGold, fontFamily: FONTS.display, fontWeight: 700, fontSize: '1.1rem' }}>
          See you on campus — thanks for building with us.
        </p>
      ) : (
        <div
          role="timer"
          aria-label={`Time until event: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
          }}
        >
          {units.map((u) => (
            <div key={u.label} style={{ textAlign: 'center' }}>
              <div style={unitStyle}>
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 'clamp(1.35rem, 4vw, 1.85rem)',
                    fontWeight: 800,
                    color: COLORS.lightGold,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pad(u.value)}
                </span>
              </div>
              <div style={labelStyle}>{u.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
