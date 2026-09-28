import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenPreorder, isMuted, onToggleMute }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track sections
      const sections = ['overview', 'technology', 'noise-cancelling', 'soundstage', 'specs'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.82)' : 'rgba(5, 5, 5, 0)',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      }}
    >
      {/* Left: Product Name / Sony Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            SONY
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '13px' }}>|</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'rgba(255, 255, 255, 0.88)',
            }}
          >
            WH-1000XM6
          </span>
        </a>
      </div>

      {/* Center: Apple-Style Minimal Nav Links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
        }}
        className="nav-links-center"
      >
        {[
          { label: 'Overview', id: 'overview' },
          { label: 'Technology', id: 'technology' },
          { label: 'Noise Cancelling', id: 'noise-cancelling' },
          { label: 'Soundstage', id: 'soundstage' },
          { label: 'Specs', id: 'specs' },
        ].map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === link.id ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
              fontSize: '12.5px',
              fontWeight: activeSection === link.id ? 600 : 400,
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              padding: '6px 2px',
              position: 'relative',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => {
              if (activeSection !== link.id) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            {link.label}
            {activeSection === link.id && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #0050ff, #00d6ff)',
                  borderRadius: '2px',
                }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Right: Audio Ambience & Pre-order CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Turn on subtle ambient acoustics' : 'Mute audio ambience'}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isMuted ? 'rgba(255, 255, 255, 0.4)' : '#00d6ff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <button
          onClick={onOpenPreorder}
          style={{
            background: 'linear-gradient(135deg, #0050ff 0%, #00d6ff 100%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '9999px',
            padding: '7px 18px',
            color: '#ffffff',
            fontSize: '12.5px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            boxShadow: '0 2px 14px rgba(0, 80, 255, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 214, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 2px 14px rgba(0, 80, 255, 0.35)';
          }}
        >
          <span>Experience WH-1000XM6</span>
          <ChevronRight size={13} />
        </button>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .nav-links-center {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
