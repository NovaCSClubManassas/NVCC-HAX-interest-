import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Calendar, MapPin, ExternalLink } from 'lucide-react';

// NVCC Nighthawks branding from the image
const COLORS = {
  darkGreen: '#0B4D2C',
  green: '#1A6B47',
  brightGreen: '#2D8659',
  gold: '#D4AF37',
  lightGold: '#E8C547',
  dark: '#0A1F14',
  darker: '#050F0A',
};

// Hard-coded FAQs (immutable in the frontend code — change requires editing this file)
const INITIAL_FAQS = [
  {
    id: '1',
    question: 'What is NVCC HAX?',
    answer:
      "NVCC HAX is Northern Virginia Community College's premier hackathon and CS club event, bringing together students, innovators, and creators for 24 hours of building, learning, and networking.",
    order: 1,
    published: true,
  },
  {
    id: '2',
    question: 'Who can participate?',
    answer:
      "All students are welcome! Whether you're a seasoned coder or have never written a line of code, HAX is designed for all skill levels.",
    order: 2,
    published: true,
  },
  {
    id: '3',
    question: 'Is there a registration fee?',
    answer:
      'Nope! NVCC HAX is completely free for all participants. We provide food, swag, mentorship, and prizes.',
    order: 3,
    published: true,
  },
  {
    id: '4',
    question: 'What should I bring?',
    answer:
      "Bring your laptop, charger, enthusiasm, and any project ideas. We'll handle the rest!",
    order: 4,
    published: true,
  },
];

const App = () => {
  // Scroll animations
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
        fontFamily: '"Space Mono", "Courier New", monospace',
        background: `linear-gradient(135deg, ${COLORS.darker} 0%, ${COLORS.dark} 50%, ${COLORS.darkGreen} 100%)`,
        minHeight: '100vh',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Circuit board background effect */}
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

      {/* Glowing orbs */}
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
        {/* Navigation */}
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
              background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
            }}
          >
            NVCC HAX
          </div>
        </nav>

        {/* Page Content */}
        <HomePage faqs={INITIAL_FAQS} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@400;700;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
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
      `}</style>
    </div>
  );
};

const HomePage = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero Section */}
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
            fontFamily: '"Orbitron", sans-serif',
            letterSpacing: '4px',
            background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold}, ${COLORS.brightGreen})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 80px ${COLORS.gold}60`,
            animationDelay: '0.1s',
          }}
        >
          NOVA HAX
        </h1>

        <p
          className="fade-up"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            marginBottom: '1rem',
            color: COLORS.lightGold,
            maxWidth: '800px',
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
            marginBottom: '3rem',
            color: '#ffffffcc',
            maxWidth: '700px',
            lineHeight: '1.6',
            animationDelay: '0.3s',
          }}
        >
          Join the Nighthawks for 24 hours of coding, building, and innovation at NVCC Manassas campus. Connect with fellow hackers, learn from mentors, and bring your wildest tech ideas to life.
        </p>

        {/* CTA Buttons */}
        <div
          className="fade-up"
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '3rem',
            animationDelay: '0.4s',
          }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSedoYRmhgJjLZ-hCz2pv08rVDFTbjJWmIdIbXgQ-GrafqCXew/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
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
              fontFamily: 'inherit',
            }}
          >
            I'm Interested
            <ExternalLink size={20} />
          </a>

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
              fontFamily: 'inherit',
            }}
          >
            Become a Judge!!
            <Users size={20} />
          </a>

          {/* Replace the href below with your Google Form URL when ready */}
          <a
            href="https://docs.google.com/forms/d/e/YOUR_SPONSOR_FORM_ID/viewform?usp=sf_link"
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
              fontFamily: 'inherit',
            }}
          >
            Sponsor
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Social Links */}
        <div
          className="fade-up"
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
              fontFamily: 'inherit',
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
              fontFamily: 'inherit',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>

        {/* Scroll indicator */}
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

      {/* Info Cards */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {[
            { icon: <Calendar size={40} />, title: 'When?', text: 'April 18-19\n24 hours of hacking' },
            { icon: <MapPin size={40} />, title: 'Where?', text: 'NVCC Manassas Campus' },
            { icon: <Users size={40} />, title: 'Who?', text: 'All students\nAll skill levels welcome' },
          ].map((card, idx) => (
            <div
              key={idx}
              className="fade-up hover-lift"
              style={{
                padding: '2rem',
                background: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
                border: `1px solid ${COLORS.green}60`,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                animationDelay: `${0.7 + idx * 0.1}s`,
              }}
            >
              <div style={{ color: COLORS.gold, marginBottom: '1rem' }}>{card.icon}</div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.75rem',
                  color: COLORS.lightGold,
                  fontFamily: '"Orbitron", sans-serif',
                }}
              >
                {card.title}
              </h3>
              <p style={{ color: '#ffffffcc', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h2
          className="fade-up"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '3rem',
            textAlign: 'center',
            fontFamily: '"Orbitron", sans-serif',
            background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs
            .filter((faq) => faq.published)
            .map((faq, idx) => (
              <FaqItem key={faq.id} faq={faq} idx={idx} openFaq={openFaq} setOpenFaq={setOpenFaq} />
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderTop: `1px solid ${COLORS.green}40`,
          marginTop: '4rem',
        }}
      >
        <p style={{ color: '#ffffff99', marginBottom: '1rem' }}>© 2026 NVCC HAX - Northern Virginia Community College Manassas</p>
        <p style={{ color: '#ffffff66', fontSize: '0.875rem' }}>Northern Virgina Comunity College Comp Sci Club (Mannasas)</p>
      </footer>
    </>
  );
};

const FaqItem = ({ faq, idx, openFaq, setOpenFaq }) => {
  return (
    <div
      className="fade-up"
      style={{
        background: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
        border: `1px solid ${COLORS.green}60`,
        borderRadius: '8px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        animationDelay: `${idx * 0.1}s`,
      }}
    >
      <button
        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
        style={{
          width: '100%',
          padding: '1.5rem',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <span>{faq.question}</span>
        <ChevronDown
          size={24}
          style={{
            transform: openFaq === faq.id ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s',
            color: COLORS.gold,
            marginLeft: '1rem',
          }}
        />
      </button>

      <div
        style={{
          maxHeight: openFaq === faq.id ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div style={{ padding: '0 1.5rem 1.5rem', color: '#ffffffcc', lineHeight: '1.6' }}>
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
