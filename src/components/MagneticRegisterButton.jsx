import { useRef, useState, useEffect, useCallback } from 'react';
import { FONTS } from '../tokens';

const STRENGTH = 0.42;
const MAX_PX = 22;

/**
 * Register CTA that shifts toward the cursor inside a padded "magnetic" zone
 * (similar to sites like HackFax × PatriotHacks). Off when prefers-reduced-motion.
 */
export default function MagneticRegisterButton({ href, target, rel, style, children }) {
  const linkRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const onMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const el = linkRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let x = (e.clientX - cx) * STRENGTH;
      let y = (e.clientY - cy) * STRENGTH;
      const m = Math.hypot(x, y);
      if (m > MAX_PX) {
        x = (x / m) * MAX_PX;
        y = (y / m) * MAX_PX;
      }
      setOffset({ x, y });
    },
    [reducedMotion]
  );

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const magnetic = !reducedMotion;

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="magnetic-register-wrap"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.75rem',
        margin: '-2.75rem',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <span
        className="magnetic-register-btn"
        style={{
          ...style,
          fontFamily: FONTS.body,
          willChange: magnetic ? 'transform' : undefined,
          transform: magnetic ? `translate(${offset.x}px, ${offset.y}px)` : undefined,
          transition: magnetic ? 'transform 0.2s ease-out, box-shadow 0.3s ease' : undefined,
        }}
      >
        {children}
      </span>
    </a>
  );
}
