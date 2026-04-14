import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS, FONTS, GRADIENTS, UI } from '../tokens';
import { ORGANIZERS } from '../data/organizers';

const AUTOPLAY_INTERVAL_MS = 3000;

const CAROUSEL_TRANSITION = 'transform 0.45s ease-out';

const sectionTitleStyle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  marginBottom: '1.25rem',
  textAlign: 'center',
  fontFamily: FONTS.display,
  fontWeight: 700,
  background: GRADIENTS.sectionHeading,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    setReduced(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function OrganizerSlide({ person }) {
  return (
    <div
      style={{
        background: UI.cardGlass,
        border: `1px solid ${COLORS.green}40`,
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: UI.shadowCard,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minHeight: 0,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: `1px solid ${COLORS.gold}44`,
            aspectRatio: '4 / 3',
            maxHeight: 'min(320px, 50vh)',
            background: COLORS.darker,
          }}
        >
          <img
            src={person.photoSrc}
            alt={`${person.name} photo`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <div>
          <h3
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 700,
              color: COLORS.lightGold,
              marginBottom: '0.35rem',
            }}
          >
            {person.name}
          </h3>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: COLORS.brightGreen,
              marginBottom: '0.75rem',
            }}
          >
            {person.role}
          </p>
          <p
            style={{
              fontFamily: FONTS.body,
              color: UI.textMuted,
              lineHeight: 1.65,
              fontSize: '0.95rem',
            }}
          >
            {person.tagline}
          </p>
        </div>
      </div>
      {person.linkedinUrl ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href={person.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              background: `${COLORS.darkGreen}cc`,
              border: `1px solid ${COLORS.gold}55`,
              color: COLORS.gold,
              textDecoration: 'none',
              fontFamily: FONTS.body,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <Linkedin size={18} aria-hidden />
            LinkedIn
          </a>
        </div>
      ) : null}
    </div>
  );
}

const navBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  borderRadius: '10px',
  border: `1px solid ${COLORS.gold}55`,
  background: `${COLORS.darker}dd`,
  color: COLORS.gold,
  cursor: 'pointer',
  zIndex: 5,
};

function CarouselShell({ children, onPrev, onNext }) {
  return (
    <div
      className="organizers-carousel-shell fade-up"
      style={{
        position: 'relative',
        paddingLeft: 'clamp(40px, 5vw, 52px)',
        paddingRight: 'clamp(40px, 5vw, 52px)',
        maxWidth: '1120px',
        margin: '0 auto',
      }}
    >
      <button
        type="button"
        className="organizers-nav-btn organizers-nav-prev"
        onClick={onPrev}
        aria-label="Previous organizer"
        style={{ ...navBtnStyle, position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronLeft size={24} aria-hidden />
      </button>
      {children}
      <button
        type="button"
        className="organizers-nav-btn organizers-nav-next"
        onClick={onNext}
        aria-label="Next organizer"
        style={{ ...navBtnStyle, position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronRight size={24} aria-hidden />
      </button>
    </div>
  );
}

const OrganizersCarouselTrack = forwardRef(function OrganizersCarouselTrack({ prefersReducedMotion }, ref) {
  const n = ORGANIZERS.length;
  const totalSlides = n + 2;
  const pctPerSlide = 100 / totalSlides;

  const trackRef = useRef(null);
  const trackIndexRef = useRef(1);
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  const applyTransform = useCallback(
    (index) => `translateX(-${(index * 100) / totalSlides}%)`,
    [totalSlides]
  );

  const snapTo = useCallback((index) => {
    setTransitionEnabled(false);
    setTrackIndex(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  }, []);

  const onTrackTransitionEnd = useCallback(
    (e) => {
      if (e.propertyName !== 'transform') return;
      if (e.target !== trackRef.current) return;
      if (prefersReducedMotion) return;
      const ti = trackIndexRef.current;
      if (ti === n + 1) {
        snapTo(1);
      } else if (ti === 0) {
        snapTo(n);
      }
    },
    [n, prefersReducedMotion, snapTo]
  );

  const goNext = useCallback(() => {
    if (prefersReducedMotion) {
      setTrackIndex((ti) => {
        const r = ti - 1;
        const nextR = (r + 1) % n;
        return nextR + 1;
      });
      return;
    }
    setTrackIndex((ti) => {
      if (ti === n + 1) return ti;
      if (ti === n) return n + 1;
      return ti + 1;
    });
  }, [n, prefersReducedMotion]);

  const goPrev = useCallback(() => {
    if (prefersReducedMotion) {
      setTrackIndex((ti) => {
        const r = ti - 1;
        const nextR = (r - 1 + n) % n;
        return nextR + 1;
      });
      return;
    }
    setTrackIndex((ti) => {
      if (ti === 0) return ti;
      if (ti === 1) return 0;
      return ti - 1;
    });
  }, [n, prefersReducedMotion]);

  useImperativeHandle(
    ref,
    () => ({
      goNext,
      goPrev,
    }),
    [goNext, goPrev]
  );

  const slides = [
    { person: ORGANIZERS[n - 1], key: 'organizers-clone-last' },
    ...ORGANIZERS.map((person) => ({ person, key: person.id })),
    { person: ORGANIZERS[0], key: 'organizers-clone-first' },
  ];

  const transition =
    prefersReducedMotion || !transitionEnabled ? 'none' : CAROUSEL_TRANSITION;

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        borderRadius: '4px',
      }}
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <div
        ref={trackRef}
        onTransitionEnd={onTrackTransitionEnd}
        style={{
          display: 'flex',
          width: `${totalSlides * 100}%`,
          transform: applyTransform(trackIndex),
          transition,
        }}
      >
        {slides.map(({ person, key }) => (
          <div
            key={key}
            style={{
              flex: `0 0 ${pctPerSlide}%`,
              width: `${pctPerSlide}%`,
              boxSizing: 'border-box',
            }}
          >
            <OrganizerSlide person={person} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default function OrganizersSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);

  const goPrev = useCallback(() => {
    carouselRef.current?.goPrev();
  }, []);

  const goNext = useCallback(() => {
    carouselRef.current?.goNext();
  }, []);

  const autoplayPaused = prefersReducedMotion;

  useEffect(() => {
    if (autoplayPaused) return undefined;
    const timer = window.setInterval(() => {
      carouselRef.current?.goNext();
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoplayPaused]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const onKey = (e) => {
      if (!root.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  return (
    <section
      ref={sectionRef}
      id="organizers"
      style={{
        padding: '4rem 2rem',
        maxWidth: '1120px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <h2 className="fade-up" style={sectionTitleStyle}>
        Meet the organizers
      </h2>
      <p
        className="fade-up"
        style={{
          textAlign: 'center',
          color: '#ffffffaa',
          maxWidth: '640px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.65,
          fontFamily: FONTS.body,
        }}
      >
        The Nighthawks CS Club crew running reNOVAte — say hi at check-in or in Discord.
      </p>

      <style>{`
        .organizers-nav-btn:focus-visible {
          outline: 2px solid ${COLORS.gold};
          outline-offset: 3px;
        }
      `}</style>

      <CarouselShell onPrev={goPrev} onNext={goNext}>
        <OrganizersCarouselTrack ref={carouselRef} prefersReducedMotion={prefersReducedMotion} />
      </CarouselShell>
    </section>
  );
}
