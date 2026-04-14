import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS, FONTS, GRADIENTS, UI } from '../tokens';
import { ORGANIZERS } from '../data/organizers';

const AUTOPLAY_INTERVAL_MS = 3000;

const CAROUSEL_TRANSITION = 'transform 0.45s ease-out';

const FOCUS_TRANSITION = 'transform 0.35s ease, opacity 0.35s ease, filter 0.35s ease, box-shadow 0.35s ease';

/** Below this width, show one full card (left-aligned) instead of three-up. */
const NARROW_MAX_PX = 640;

const CENTER_LIFT_PX = 10;

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

function useMaxWidth(maxPx) {
  const [matches, setMatches] = useState(
    () => (typeof window !== 'undefined' ? window.matchMedia(`(max-width: ${maxPx}px)`).matches : false)
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    setMatches(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, [maxPx]);

  return matches;
}

function OrganizerSlide({ person, variant, onSeeMore }) {
  const isPreview = variant === 'preview';
  return (
    <div
      role="group"
      aria-label={`${person.name}, ${person.role}`}
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
        cursor: onSeeMore ? 'pointer' : undefined,
      }}
      onClick={
        onSeeMore
          ? () => {
              onSeeMore(person.id);
            }
          : undefined
      }
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
            className="organizers-role"
            style={{
              fontFamily: FONTS.body,
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: COLORS.brightGreen,
              marginBottom: isPreview ? 0 : '0.75rem',
            }}
          >
            {person.role}
          </p>
          {!isPreview ? (
            <p
              className="organizers-tagline"
              style={{
                fontFamily: FONTS.body,
                color: UI.textMuted,
                lineHeight: 1.65,
                fontSize: '0.95rem',
              }}
            >
              {person.tagline}
            </p>
          ) : null}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSeeMore?.(person.id);
          }}
          style={{
            padding: '0.5rem 0.9rem',
            borderRadius: '8px',
            border: `1px solid ${COLORS.gold}55`,
            background: `${COLORS.darker}aa`,
            color: COLORS.gold,
            fontFamily: FONTS.body,
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          See more
        </button>
        {!isPreview && person.linkedinUrl ? (
          <a
            href={person.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
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
        ) : null}
      </div>
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

/**
 * Build slide row + index constants for infinite loop.
 * n>=2: two prefix clones (n-2,n-1), reals, two suffix clones (0,1) so last→first and first→last
 * always have a full prev|center|next triplet during the wrap animation.
 * n<2: minimal [clone last][reals][clone first] (same as original).
 */
function getCarouselLayout(n) {
  if (n < 2) {
    const slides = [
      { person: ORGANIZERS[Math.max(0, n - 1)], key: 'organizers-clone-last' },
      ...ORGANIZERS.map((person) => ({ person, key: person.id })),
      { person: ORGANIZERS[0], key: 'organizers-clone-first' },
    ];
    return {
      slides,
      totalSlides: n + 2,
      firstRealIndex: 1,
      lastRealIndex: n,
      forwardWrapFromIndex: n + 1,
      forwardSnapTarget: 1,
      backwardWrapFromIndex: 0,
      backwardSnapTarget: n,
    };
  }
  const PREFIX = 2;
  const SUFFIX = 2;
  const slides = [
    { person: ORGANIZERS[n - 2], key: 'organizers-clone-penultimate' },
    { person: ORGANIZERS[n - 1], key: 'organizers-clone-last' },
    ...ORGANIZERS.map((person) => ({ person, key: person.id })),
    { person: ORGANIZERS[0], key: 'organizers-clone-first' },
    { person: ORGANIZERS[1], key: 'organizers-clone-second' },
  ];
  const totalSlides = PREFIX + n + SUFFIX;
  return {
    slides,
    totalSlides,
    firstRealIndex: PREFIX,
    lastRealIndex: PREFIX + n - 1,
    forwardWrapFromIndex: PREFIX + n,
    forwardSnapTarget: PREFIX,
    backwardWrapFromIndex: PREFIX - 1,
    backwardSnapTarget: PREFIX + n - 1,
  };
}

function OrganizerSlideFocusWrapper({ layoutThreeUp, isCenter, prefersReducedMotion, children }) {
  const motionOff = prefersReducedMotion || !layoutThreeUp;
  const focusTransition = motionOff ? 'none' : FOCUS_TRANSITION;

  if (!layoutThreeUp) {
    return <div style={{ height: '100%' }}>{children}</div>;
  }

  const base = {
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    transition: focusTransition,
    willChange: motionOff ? undefined : 'transform',
  };

  if (isCenter) {
    return (
      <div
        style={{
          ...base,
          transform: `scale(1) translateY(-${CENTER_LIFT_PX}px)`,
          zIndex: 3,
          boxShadow: `0 20px 48px ${COLORS.darker}aa`,
          borderRadius: '18px',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        ...base,
        transform: 'scale(0.88)',
        opacity: 0.88,
        filter: 'brightness(0.92)',
        zIndex: 1,
        borderRadius: '16px',
      }}
    >
      {children}
    </div>
  );
}

const OrganizersCarouselTrack = forwardRef(function OrganizersCarouselTrack({ prefersReducedMotion, onSeeMore }, ref) {
  const narrow = useMaxWidth(NARROW_MAX_PX);
  const layoutThreeUp = !narrow;

  const n = ORGANIZERS.length;
  const layout = useMemo(() => getCarouselLayout(n), [n]);
  const { slides, totalSlides, firstRealIndex, lastRealIndex, forwardWrapFromIndex, forwardSnapTarget, backwardWrapFromIndex, backwardSnapTarget } = layout;

  const pctPerSlide = 100 / totalSlides;
  /** One-up: track is S viewport-widths so each slide = 1 full viewport. Three-up: track is S/3 viewport-widths so each slide = 1/3 viewport (three visible). */
  const trackWidthPercent = layoutThreeUp ? (totalSlides / 3) * 100 : totalSlides * 100;

  const trackRef = useRef(null);
  const trackIndexRef = useRef(firstRealIndex);
  const [trackIndex, setTrackIndex] = useState(firstRealIndex);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  /** Wide: center active slide in viewport. Narrow: one slide at a time (left-aligned). */
  const applyTransform = useCallback(
    (index) => {
      if (layoutThreeUp) {
        return `translateX(-${((index - 1) * 100) / totalSlides}%)`;
      }
      return `translateX(-${(index * 100) / totalSlides}%)`;
    },
    [totalSlides, layoutThreeUp]
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
      if (ti === forwardWrapFromIndex) {
        snapTo(forwardSnapTarget);
      } else if (ti === backwardWrapFromIndex) {
        snapTo(backwardSnapTarget);
      }
    },
    [prefersReducedMotion, snapTo, forwardWrapFromIndex, forwardSnapTarget, backwardWrapFromIndex, backwardSnapTarget]
  );

  const goNext = useCallback(() => {
    if (prefersReducedMotion) {
      setTrackIndex((ti) => {
        const r = Math.min(n - 1, Math.max(0, ti - firstRealIndex));
        const nextR = (r + 1) % n;
        return firstRealIndex + nextR;
      });
      return;
    }
    setTrackIndex((ti) => {
      if (ti === forwardWrapFromIndex) return ti;
      if (ti === lastRealIndex) return forwardWrapFromIndex;
      if (ti < totalSlides - 1) return ti + 1;
      return ti;
    });
  }, [
    n,
    prefersReducedMotion,
    firstRealIndex,
    lastRealIndex,
    forwardWrapFromIndex,
    totalSlides,
  ]);

  const goPrev = useCallback(() => {
    if (prefersReducedMotion) {
      setTrackIndex((ti) => {
        const r = Math.min(n - 1, Math.max(0, ti - firstRealIndex));
        const nextR = (r - 1 + n) % n;
        return firstRealIndex + nextR;
      });
      return;
    }
    setTrackIndex((ti) => {
      if (ti === backwardWrapFromIndex) return ti;
      if (ti === firstRealIndex) return backwardWrapFromIndex;
      if (ti > 0) return ti - 1;
      return ti;
    });
  }, [prefersReducedMotion, n, firstRealIndex, backwardWrapFromIndex]);

  useImperativeHandle(
    ref,
    () => ({
      goNext,
      goPrev,
    }),
    [goNext, goPrev]
  );

  const transition =
    prefersReducedMotion || !transitionEnabled ? 'none' : CAROUSEL_TRANSITION;

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maxWidth: layoutThreeUp ? '960px' : '440px',
        margin: '0 auto',
        borderRadius: '4px',
        paddingTop: layoutThreeUp ? 'clamp(0.75rem, 2vw, 1.25rem)' : 0,
        paddingBottom: layoutThreeUp ? 'clamp(0.75rem, 2vw, 1.25rem)' : 0,
        boxSizing: 'border-box',
      }}
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <div
        ref={trackRef}
        onTransitionEnd={onTrackTransitionEnd}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: `${trackWidthPercent}%`,
          transform: applyTransform(trackIndex),
          transition,
        }}
      >
        {slides.map(({ person, key }, slideIndex) => {
          const rel = slideIndex - trackIndex;
          const isCenter = layoutThreeUp && rel === 0;
          const variant = layoutThreeUp ? (isCenter ? 'center' : 'preview') : 'center';

          return (
            <div
              key={key}
              style={{
                flex: `0 0 ${pctPerSlide}%`,
                width: `${pctPerSlide}%`,
                boxSizing: 'border-box',
                paddingLeft: layoutThreeUp ? '0.5rem' : 0,
                paddingRight: layoutThreeUp ? '0.5rem' : 0,
              }}
            >
              <OrganizerSlideFocusWrapper
                layoutThreeUp={layoutThreeUp}
                isCenter={isCenter}
                prefersReducedMotion={prefersReducedMotion}
              >
                <OrganizerSlide person={person} variant={variant} onSeeMore={onSeeMore} />
              </OrganizerSlideFocusWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default function OrganizersSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const lastFocusRef = useRef(null);

  const goPrev = useCallback(() => {
    carouselRef.current?.goPrev();
  }, []);

  const goNext = useCallback(() => {
    carouselRef.current?.goNext();
  }, []);

  const [autoplayUserPaused, setAutoplayUserPaused] = useState(false);
  const [modalPersonId, setModalPersonId] = useState(null);
  const isModalOpen = modalPersonId != null;

  const openModal = useCallback((personId) => {
    setAutoplayUserPaused(true);
    lastFocusRef.current = document.activeElement;
    setModalPersonId(personId);
  }, []);

  const closeModal = useCallback(() => {
    setModalPersonId(null);
    const el = lastFocusRef.current;
    if (el && typeof el.focus === 'function') {
      // Restore focus after close (best-effort).
      setTimeout(() => el.focus(), 0);
    }
  }, []);

  const onAnyInteract = useCallback(() => {
    setAutoplayUserPaused(true);
  }, []);

  const autoplayPaused = prefersReducedMotion || autoplayUserPaused || isModalOpen;

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
        onAnyInteract();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onAnyInteract();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, onAnyInteract]);

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, closeModal]);

  const modalPerson = useMemo(() => (modalPersonId ? ORGANIZERS.find((o) => o.id === modalPersonId) : null), [modalPersonId]);

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
        .organizers-role {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 1.35em;
        }

        .organizers-tagline {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(2 * 1.65em);
        }

        .organizers-nav-btn:focus-visible {
          outline: 2px solid ${COLORS.gold};
          outline-offset: 3px;
        }

        .organizers-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.62);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          z-index: 999;
        }

        .organizers-modal {
          width: min(860px, 100%);
          max-height: min(86vh, 920px);
          overflow: auto;
          background: ${UI.cardGlass};
          border: 1px solid ${COLORS.green}55;
          border-radius: 16px;
          box-shadow: 0 28px 90px rgba(0,0,0,0.55);
        }
      `}</style>

      <CarouselShell
        onPrev={() => {
          onAnyInteract();
          goPrev();
        }}
        onNext={() => {
          onAnyInteract();
          goNext();
        }}
      >
        <OrganizersCarouselTrack
          ref={carouselRef}
          prefersReducedMotion={prefersReducedMotion}
          onSeeMore={(id) => {
            onAnyInteract();
            openModal(id);
          }}
        />
      </CarouselShell>

      {isModalOpen && modalPerson ? (
        <div
          className="organizers-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="presentation"
        >
          <div
            className="organizers-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="organizers-modal-title"
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h3
                  id="organizers-modal-title"
                  style={{ fontFamily: FONTS.display, fontSize: '1.6rem', color: COLORS.lightGold, marginBottom: '0.25rem' }}
                >
                  {modalPerson.name}
                </h3>
                <p style={{ fontFamily: FONTS.body, color: COLORS.brightGreen, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  {modalPerson.role}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="organizers-nav-btn"
                style={navBtnStyle}
                ref={(el) => {
                  if (el) el.focus();
                }}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.9fr) minmax(260px, 1.1fr)', gap: '1.25rem', marginTop: '1.25rem' }}>
              <div
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.gold}44`,
                  background: COLORS.darker,
                  aspectRatio: '4 / 3',
                }}
              >
                <img src={modalPerson.photoSrc} alt={`${modalPerson.name} photo`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: FONTS.body, color: UI.textMuted, lineHeight: 1.75, fontSize: '1rem', marginBottom: '1rem' }}>
                  {modalPerson.tagline}
                </p>
                {modalPerson.linkedinUrl ? (
                  <a
                    href={modalPerson.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      background: `${COLORS.darkGreen}cc`,
                      border: `1px solid ${COLORS.gold}55`,
                      color: COLORS.gold,
                      textDecoration: 'none',
                      fontFamily: FONTS.body,
                      fontWeight: 700,
                    }}
                  >
                    <Linkedin size={20} aria-hidden />
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
