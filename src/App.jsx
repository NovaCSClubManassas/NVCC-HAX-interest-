import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, ExternalLink, HelpCircle, Gift, Package, UserPlus } from 'lucide-react';
import { COLORS, FONTS, UI, GRADIENTS } from './tokens';
import { FAQS } from './data/faqs';
import EventCountdown from './components/EventCountdown';
import ThemeCardGrid from './components/ThemeCardGrid';
import ScheduleTimeline from './components/ScheduleTimeline';
import OrganizersSection from './components/OrganizersSection';
import ContactSection from './components/ContactSection';
import FaqItem from './components/FaqItem';
import MagneticRegisterButton from './components/MagneticRegisterButton';

const FAQ_ICONS = {
  1: HelpCircle,
  2: Users,
  3: Gift,
  4: Package,
  5: UserPlus,
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

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        fontFamily: FONTS.body,
        background: `linear-gradient(135deg, ${COLORS.darker} 0%, ${COLORS.dark} 50%, ${COLORS.darkGreen} 100%)`,
        minHeight: '100vh',
        maxWidth: '100%',
        color: '#fff',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
          linear-gradient(${COLORS.green}33 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.green}33 1px, transparent 1px)
        `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${COLORS.gold}40 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '5%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${COLORS.brightGreen}30 0%, transparent 70%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <nav
          style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${COLORS.green}40`,
            backdropFilter: 'blur(10px)',
            background: 'rgba(10, 31, 20, 0.8)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontFamily: FONTS.display,
              letterSpacing: '2px',
              background: GRADIENTS.navWordmark,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            reNOVAte Create-a-thon
          </div>
        </nav>

        <HomePage />
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .fade-up {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-trigger:focus-visible {
          outline: 2px solid ${COLORS.gold};
          outline-offset: 2px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .magnetic-register-btn:hover {
          box-shadow: 0 12px 36px rgba(212, 175, 55, 0.45);
        }

        @media (max-width: 640px) {
          .social-links {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }

          .social-links a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

const HomePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = FAQS;

  return (
    <>
      <section
        style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative',
        }}
      >
        <h1
          className="fade-up"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            fontFamily: FONTS.display,
            letterSpacing: '4px',
            background: GRADIENTS.heroTitle,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `0 0 80px ${COLORS.gold}60`,
            animationDelay: '0.1s',
          }}
        >
          reNOVAte Create-a-thon
        </h1>

        <p
          className="fade-up"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            marginBottom: '1rem',
            color: COLORS.lightGold,
            maxWidth: '800px',
            fontFamily: FONTS.display,
            fontWeight: 'bold',
            animationDelay: '0.2s',
          }}
        >
          Northern Virginia Community College
        </p>

        <p
          className="fade-up"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            marginBottom: '2rem',
            color: '#ffffffcc',
            maxWidth: '700px',
            lineHeight: '1.6',
            animationDelay: '0.3s',
          }}
        >
          Join the Nighthawks on April 18th for 10 hours of coding, building, and innovation at NVCC Manassas campus.
          Connect with fellow builders, learn from mentors, and bring your wildest tech ideas to life.
        </p>

        <div
          className="fade-up"
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '2rem',
            animationDelay: '0.4s',
          }}
        >
          <MagneticRegisterButton
            href="https://docs.google.com/forms/d/e/1FAIpQLSecG3E17tstmPmlDcuvlDYXIXiX9AcnPLumBTgDudaOWLIahw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1.25rem 2.5rem',
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.lightGold})`,
              border: 'none',
              borderRadius: '8px',
              color: COLORS.darker,
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Register!!
            <ExternalLink size={20} />
          </MagneticRegisterButton>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeI9y2X2WKxh8BUfwh3aDYz8705md-EfHJeq1iNJ0Y-43OJzA/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
            style={{
              padding: '1.25rem 2.5rem',
              background: 'transparent',
              border: `2px solid ${COLORS.gold}`,
              borderRadius: '8px',
              color: COLORS.gold,
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              fontFamily: FONTS.body,
            }}
          >
            Become a Judge/Mentor!!
            <Users size={20} />
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf62TrVyY-8sINGdBUCish25_y08o-EPTk3zcWG7sMHeo1HZA/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
            style={{
              padding: '1.25rem 2.5rem',
              background: 'transparent',
              border: `2px solid ${COLORS.gold}`,
              borderRadius: '8px',
              color: COLORS.gold,
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              fontFamily: FONTS.body,
            }}
          >
            Sponsor
            <ExternalLink size={20} />
          </a>
        </div>

        <EventCountdown />

        <div
          className="fade-up social-links"
          style={{
            display: 'flex',
            gap: '1.5rem',
            animationDelay: '0.5s',
          }}
        >
          <a
            href="https://x.com/nvccmacsclub"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.75rem 1.5rem',
              background: COLORS.darkGreen,
              border: `1px solid ${COLORS.green}`,
              borderRadius: '6px',
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              fontFamily: FONTS.body,
            }}
          >
            𝕏 (twitter)
          </a>

          <a
            href="https://www.instagram.com/novamacompsci/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.75rem 1.5rem',
              background: COLORS.darkGreen,
              border: `1px solid ${COLORS.green}`,
              borderRadius: '6px',
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              fontFamily: FONTS.body,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
          <a
            href="https://discord.gg/RnJxNzae73"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.75rem 1.5rem',
              background: COLORS.darkGreen,
              border: `1px solid ${COLORS.green}`,
              borderRadius: '6px',
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              fontFamily: FONTS.body,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
        </div>

        <div
          className="fade-up"
          style={{
            marginTop: '4rem',
            animation: 'float 2s ease-in-out infinite',
            animationDelay: '0.6s',
          }}
        >
          <ChevronDown size={32} color={COLORS.gold} />
        </div>
      </section>

      <ThemeCardGrid />

      <ScheduleTimeline />

      <OrganizersSection />

      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <h2 className="fade-up" style={sectionTitleStyle}>
          Thank you to our sponsor
        </h2>
        <p
          className="fade-up"
          style={{
            textAlign: 'center',
            color: UI.textMuted,
            marginBottom: '2rem',
            fontFamily: FONTS.body,
            lineHeight: 1.6,
          }}
        >
          We’re grateful for our sponsors support for helping this event and our students.
        </p>
        <div
          className="fade-up"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(245,245,245,0.88))',
            border: `1px solid ${COLORS.green}40`,
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <img
            src="/sponsors/dominion-energy.png"
            alt="Dominion Energy, Powering Your Every Day"
            loading="lazy"
            style={{
              maxWidth: 'min(480px, 100%)',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="fade-up" style={sectionTitleStyle}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs
            .filter((faq) => faq.published)
            .map((faq, idx) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                idx={idx}
                openFaq={openFaq}
                setOpenFaq={setOpenFaq}
                Icon={FAQ_ICONS[Number(faq.id)] || HelpCircle}
              />
            ))}
        </div>
      </section>

      <ContactSection />

      <footer
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderTop: `1px solid ${COLORS.green}40`,
          marginTop: '4rem',
        }}
      >
        <p style={{ color: '#ffffff99', marginBottom: '1rem' }}>
          © 2026 reNOVAte Create-a-thon — Northern Virginia Community College Manassas
        </p>
        <p style={{ color: '#ffffff66', fontSize: '0.875rem' }}>
          NVCC Computer Science Club — hosted on campus with faculty support.
        </p>
      </footer>
    </>
  );
};

export default App;
