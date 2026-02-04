import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, Users, Calendar, MapPin, ExternalLink, Plus, Edit2, Trash2, Save } from 'lucide-react';

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

// Mock data - replace with actual API calls
const INITIAL_FAQS = [
  {
    id: '1',
    question: 'What is NVCC HAX?',
    answer: 'NVCC HAX is Northern Virginia Community College\'s premier hackathon and CS club event, bringing together students, innovators, and creators for 24 hours of building, learning, and networking.',
    order: 1,
    published: true
  },
  {
    id: '2',
    question: 'Who can participate?',
    answer: 'All students are welcome! Whether you\'re a seasoned coder or have never written a line of code, HAX is designed for all skill levels.',
    order: 2,
    published: true
  },
  {
    id: '3',
    question: 'Is there a registration fee?',
    answer: 'Nope! NVCC HAX is completely free for all participants. We provide food, swag, mentorship, and prizes.',
    order: 3,
    published: true
  },
  {
    id: '4',
    question: 'What should I bring?',
    answer: 'Bring your laptop, charger, student ID, enthusiasm, and any project ideas. We\'ll handle the rest!',
    order: 4,
    published: true
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [editingFaq, setEditingFaq] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

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
  }, [currentPage]);

  const handleAdminLogin = () => {
    // Simple password check - replace with actual auth
    if (adminPassword === 'nighthawks2024') {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Invalid password');
    }
  };

  const addFaq = () => {
    const newFaq = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'New Answer',
      order: faqs.length + 1,
      published: true
    };
    setFaqs([...faqs, newFaq]);
    setEditingFaq(newFaq.id);
  };

  const updateFaq = (id, updates) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, ...updates } : faq));
  };

  const deleteFaq = (id) => {
    if (confirm('Delete this FAQ?')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  const saveFaq = () => {
    setEditingFaq(null);
    // Here you would make an API call to persist changes
    alert('FAQ saved! (In production, this would save to your backend)');
  };

  return (
    <div style={{ 
      fontFamily: '"Space Mono", "Courier New", monospace',
      background: `linear-gradient(135deg, ${COLORS.darker} 0%, ${COLORS.dark} 50%, ${COLORS.darkGreen} 100%)`,
      minHeight: '100vh',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Circuit board background effect */}
      <div style={{
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
        zIndex: 0
      }} />

      {/* Glowing orbs */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${COLORS.gold}40 0%, transparent 70%)`,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${COLORS.brightGreen}30 0%, transparent 70%)`,
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navigation */}
        <nav style={{
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${COLORS.green}40`,
          backdropFilter: 'blur(10px)',
          background: 'rgba(10, 31, 20, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px'
          }}>
            NVCC HAX
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentPage('home')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'home' ? COLORS.gold : '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: currentPage === 'home' ? 'bold' : 'normal',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('sponsor')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'sponsor' ? COLORS.gold : '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: currentPage === 'sponsor' ? 'bold' : 'normal',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
            >
              Sponsor
            </button>
            {isAdmin && (
              <button 
                onClick={() => setCurrentPage('admin')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPage === 'admin' ? COLORS.gold : '#fff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: currentPage === 'admin' ? 'bold' : 'normal',
                  transition: 'all 0.3s',
                  fontFamily: 'inherit'
                }}
              >
                Admin
              </button>
            )}
            {!isAdmin && (
              <button 
                onClick={() => setShowAdminLogin(true)}
                style={{
                  background: 'none',
                  border: `1px solid ${COLORS.green}`,
                  color: COLORS.gold,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  fontFamily: 'inherit'
                }}
              >
                Admin Login
              </button>
            )}
          </div>
        </nav>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200
          }}>
            <div style={{
              background: COLORS.dark,
              padding: '2rem',
              borderRadius: '8px',
              border: `1px solid ${COLORS.green}`,
              maxWidth: '400px',
              width: '90%'
            }}>
              <h2 style={{ color: COLORS.gold, marginBottom: '1rem' }}>Admin Login</h2>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  background: COLORS.darker,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: '4px',
                  color: '#fff',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleAdminLogin}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: COLORS.green,
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontFamily: 'inherit'
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'transparent',
                    border: `1px solid ${COLORS.green}`,
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Cancel
                </button>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
                Demo password: nighthawks2024
              </p>
            </div>
          </div>
        )}

        {/* Page Content */}
        {currentPage === 'home' && <HomePage faqs={faqs} editingFaq={editingFaq} setEditingFaq={setEditingFaq} updateFaq={updateFaq} isAdmin={isAdmin} />}
        {currentPage === 'sponsor' && <SponsorPage />}
        {currentPage === 'admin' && isAdmin && <AdminPage faqs={faqs} setFaqs={setFaqs} addFaq={addFaq} updateFaq={updateFaq} deleteFaq={deleteFaq} editingFaq={editingFaq} setEditingFaq={setEditingFaq} saveFaq={saveFaq} />}
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

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px ${COLORS.gold}60; }
          50% { box-shadow: 0 0 40px ${COLORS.gold}90, 0 0 60px ${COLORS.gold}60; }
        }

        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
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

const HomePage = ({ faqs, editingFaq, setEditingFaq, updateFaq, isAdmin }) => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative'
      }}>
       

        <h1 className="fade-up" style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          marginBottom: '1rem',
          fontFamily: '"Orbitron", sans-serif',
          letterSpacing: '4px',
          background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold}, ${COLORS.brightGreen})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0 0 80px ${COLORS.gold}60`,
          animationDelay: '0.1s'
        }}>
          NOVA HAX
        </h1>

        <p className="fade-up" style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          marginBottom: '1rem',
          color: COLORS.lightGold,
          maxWidth: '800px',
          fontWeight: 'bold',
          animationDelay: '0.2s'
        }}>
          Northern Virginia Community College
        </p>

        <p className="fade-up" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          marginBottom: '3rem',
          color: '#ffffffcc',
          maxWidth: '700px',
          lineHeight: '1.6',
          animationDelay: '0.3s'
        }}>
          Join the Nighthawks for 24 hours of coding, building, and innovation at NVCC Manassas campus. Connect with fellow hackers, learn from mentors, and bring your wildest tech ideas to life.
        </p>

        {/* CTA Buttons */}
        <div className="fade-up" style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '3rem',
          animationDelay: '0.4s'
        }}>
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
              fontFamily: 'inherit'
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
              fontFamily: 'inherit'
            }}
          >
            Become a Judge!!
            <Users size={20} />
          </a>
        </div>

        {/* Social Links */}
        <div className="fade-up" style={{
          display: 'flex',
          gap: '1.5rem',
          animationDelay: '0.5s'
        }}>
          <a
            href="https://discord.gg/5fnKH5n9"
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
              fontFamily: 'inherit'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
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
              fontFamily: 'inherit'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="fade-up" style={{
          marginTop: '4rem',
          animation: 'float 2s ease-in-out infinite',
          animationDelay: '0.6s'
        }}>
          <ChevronDown size={32} color={COLORS.gold} />
        </div>
      </section>

      {/* Info Cards */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: <Calendar size={40} />, title: 'When?', text: 'Mid April\n24 hours of hacking' },
            { icon: <MapPin size={40} />, title: 'Where?', text: 'NVCC Manassas Campus\nColgan' },
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
                animationDelay: `${0.7 + idx * 0.1}s`
              }}
            >
              <div style={{ color: COLORS.gold, marginBottom: '1rem' }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '0.75rem',
                color: COLORS.lightGold,
                fontFamily: '"Orbitron", sans-serif'
              }}>
                {card.title}
              </h3>
              <p style={{ 
                color: '#ffffffcc',
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h2 className="fade-up" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: '"Orbitron", sans-serif',
          background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.filter(faq => faq.published).map((faq, idx) => (
            <div
              key={faq.id}
              className="fade-up"
              style={{
                background: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
                border: `1px solid ${COLORS.green}60`,
                borderRadius: '8px',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                animationDelay: `${idx * 0.1}s`
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
                  fontFamily: 'inherit'
                }}
              >
                {editingFaq === faq.id && isAdmin ? (
                  <input
                    value={faq.question}
                    onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1,
                      background: COLORS.darker,
                      border: `1px solid ${COLORS.gold}`,
                      borderRadius: '4px',
                      padding: '0.5rem',
                      color: '#fff',
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <span>{faq.question}</span>
                )}
                <ChevronDown
                  size={24}
                  style={{
                    transform: openFaq === faq.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s',
                    color: COLORS.gold,
                    marginLeft: '1rem'
                  }}
                />
              </button>
              
              <div style={{
                maxHeight: openFaq === faq.id ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}>
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  color: '#ffffffcc',
                  lineHeight: '1.6'
                }}>
                  {editingFaq === faq.id && isAdmin ? (
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        background: COLORS.darker,
                        border: `1px solid ${COLORS.gold}`,
                        borderRadius: '4px',
                        padding: '0.75rem',
                        color: '#fff',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: `1px solid ${COLORS.green}40`,
        marginTop: '4rem'
      }}>
        <p style={{ color: '#ffffff99', marginBottom: '1rem' }}>
          © 2025 NVCC HAX - Northern Virginia Community College Manassas
        </p>
        <p style={{ color: '#ffffff66', fontSize: '0.875rem' }}>
          Northern Virgina Comunity College Comp Sci Club (Mannasas)
        </p>
      </footer>
    </>
  );
};

const SponsorPage = () => {
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
    level: 'bronze'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would call your API endpoint
    console.log('Sponsor form submitted:', formData);
    alert('Thank you for your interest! We\'ll be in touch soon.\n\n(In production, this would send an email and save to your database)');
    setFormData({
      company: '',
      contactName: '',
      email: '',
      phone: '',
      message: '',
      level: 'bronze'
    });
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Hero */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 className="fade-up" style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          marginBottom: '1.5rem',
          fontFamily: '"Orbitron", sans-serif',
          background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Sponsor NVCC HAX
        </h1>

        <p className="fade-up" style={{
          fontSize: '1.25rem',
          color: '#ffffffcc',
          marginBottom: '3rem',
          lineHeight: '1.6',
          animationDelay: '0.1s'
        }}>
          Join us in empowering the next generation of innovators. Your support helps provide resources, mentorship, and opportunities for NVCC students to explore technology and bring their ideas to life.
        </p>
      </section>

      {/* Sponsorship Tiers */}
      <section style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 className="fade-up" style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          color: COLORS.lightGold,
          fontFamily: '"Orbitron", sans-serif'
        }}>
          Sponsorship Tiers
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {[
            { 
              name: 'Gold', 
              amount: '$5,000+',
              color: COLORS.gold,
              benefits: ['Logo on website & materials', 'Booth at event', 'Recruiting table', '5 judge passes', 'Social media shoutouts']
            },
            { 
              name: 'Silver', 
              amount: '$2,500+',
              color: '#C0C0C0',
              benefits: ['Logo on website', 'Booth at event', '3 judge passes', 'Social media mentions']
            },
            { 
              name: 'Bronze', 
              amount: '$1,000+',
              color: '#CD7F32',
              benefits: ['Logo on website', '2 judge passes', 'Name in materials']
            },
          ].map((tier, idx) => (
            <div
              key={idx}
              className="fade-up hover-lift"
              style={{
                padding: '2rem',
                background: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
                border: `2px solid ${tier.color}`,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                animationDelay: `${idx * 0.1}s`
              }}
            >
              <h3 style={{
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
                color: tier.color,
                fontFamily: '"Orbitron", sans-serif'
              }}>
                {tier.name}
              </h3>
              <p style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                color: COLORS.lightGold,
                fontWeight: 'bold'
              }}>
                {tier.amount}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: '#ffffffcc',
                fontSize: '0.95rem'
              }}>
                {tier.benefits.map((benefit, i) => (
                  <li key={i} style={{
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: tier.color
                    }}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section style={{
        padding: '2rem',
        maxWidth: '700px',
        margin: '0 auto 4rem'
      }}>
        <div className="fade-up" style={{
          background: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
          border: `1px solid ${COLORS.green}60`,
          borderRadius: '12px',
          padding: '3rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '2rem',
            color: COLORS.lightGold,
            fontFamily: '"Orbitron", sans-serif'
          }}>
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: COLORS.gold,
                fontWeight: 'bold'
              }}>
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: COLORS.darker,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: COLORS.gold,
                fontWeight: 'bold'
              }}>
                Contact Person *
              </label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: COLORS.darker,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: COLORS.gold,
                  fontWeight: 'bold'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: COLORS.darker,
                    border: `1px solid ${COLORS.green}`,
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: COLORS.gold,
                  fontWeight: 'bold'
                }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: COLORS.darker,
                    border: `1px solid ${COLORS.green}`,
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: COLORS.gold,
                fontWeight: 'bold'
              }}>
                Sponsorship Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: COLORS.darker,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                <option value="gold">Gold ($5,000+)</option>
                <option value="silver">Silver ($2,500+)</option>
                <option value="bronze">Bronze ($1,000+)</option>
                <option value="custom">Custom/Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: COLORS.gold,
                fontWeight: 'bold'
              }}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: COLORS.darker,
                  border: `1px solid ${COLORS.green}`,
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.lightGold})`,
                border: 'none',
                borderRadius: '8px',
                color: COLORS.darker,
                fontSize: '1.125rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'transform 0.3s'
              }}
            >
              Send Message
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: COLORS.darkGreen,
            borderRadius: '8px',
            border: `1px solid ${COLORS.green}`
          }}>
            <p style={{
              color: '#ffffffcc',
              marginBottom: '1rem',
              fontSize: '0.95rem'
            }}>
              💬 <strong>Want to chat live?</strong> Our team is available to answer questions and discuss sponsorship opportunities.
            </p>
            <p style={{
              color: '#ffffff99',
              fontSize: '0.875rem'
            }}>
              (In production, a chat widget like Tawk.to or Crisp would be embedded here for real-time conversations)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const AdminPage = ({ faqs, addFaq, updateFaq, deleteFaq, editingFaq, setEditingFaq, saveFaq }) => {
  return (
    <div style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          fontFamily: '"Orbitron", sans-serif',
          background: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          FAQ Management
        </h1>

        <button
          onClick={addFaq}
          style={{
            marginBottom: '2rem',
            padding: '1rem 2rem',
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.lightGold})`,
            border: 'none',
            borderRadius: '8px',
            color: COLORS.darker,
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'inherit'
          }}
        >
          <Plus size={20} />
          Add New FAQ
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              style={{
                background: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
                border: `1px solid ${editingFaq === faq.id ? COLORS.gold : COLORS.green}60`,
                borderRadius: '8px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: COLORS.gold,
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  Question
                </label>
                <input
                  value={faq.question}
                  onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                  disabled={editingFaq !== faq.id}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: editingFaq === faq.id ? COLORS.darker : `${COLORS.darker}80`,
                    border: `1px solid ${COLORS.green}`,
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: COLORS.gold,
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  Answer
                </label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                  disabled={editingFaq !== faq.id}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: editingFaq === faq.id ? COLORS.darker : `${COLORS.darker}80`,
                    border: `1px solid ${COLORS.green}`,
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffffcc',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={faq.published}
                    onChange={(e) => updateFaq(faq.id, { published: e.target.checked })}
                    disabled={editingFaq !== faq.id}
                    style={{ cursor: 'pointer' }}
                  />
                  Published
                </label>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                  {editingFaq === faq.id ? (
                    <button
                      onClick={() => {
                        saveFaq();
                        setEditingFaq(null);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: COLORS.green,
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'inherit'
                      }}
                    >
                      <Save size={16} />
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingFaq(faq.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: COLORS.darkGreen,
                        border: `1px solid ${COLORS.green}`,
                        borderRadius: '6px',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'inherit'
                      }}
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteFaq(faq.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      border: `1px solid #ff4444`,
                      borderRadius: '6px',
                      color: '#ff4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
