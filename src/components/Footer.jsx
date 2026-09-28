import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#030304', borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '80px 0 40px', color: 'rgba(255, 255, 255, 0.5)' }}>
      <div className="container">
        {/* Top Footnote / Disclaimer */}
        <div style={{ fontSize: '11.5px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.35)', marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p style={{ marginBottom: '8px' }}>
            1. As of September 2026. Measured using JEITA-compliant guidelines in headband-style wireless noise cancelling headphones.
          </p>
          <p style={{ marginBottom: '8px' }}>
            2. High-Resolution Audio Wireless requires compatible player device and LDAC-supported streaming source.
          </p>
          <p>
            3. DSEE Extreme™ utilizes Edge-AI and deep learning to restore acoustic harmonic details lost during digital compression.
          </p>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '60px' }}>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              WH-1000XM6 Series
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#overview" style={{ color: 'inherit', textDecoration: 'none' }}>Overview</a></li>
              <li><a href="#technology" style={{ color: 'inherit', textDecoration: 'none' }}>Acoustic CAD Blueprint</a></li>
              <li><a href="#soundstage" style={{ color: 'inherit', textDecoration: 'none' }}>QN2 Noise Cancelling</a></li>
              <li><a href="#finishes" style={{ color: 'inherit', textDecoration: 'none' }}>Material Finishes</a></li>
              <li><a href="#specs" style={{ color: 'inherit', textDecoration: 'none' }}>Technical Specifications</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Software & Apps
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sony Headphones Connect App</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>360 Spatial Sound Personalizer</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Firmware Updates</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LE Audio & LC3 Support</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Sustainability
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Road to Zero Environmental Plan</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Original Blended Material Package</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Recycled Automotive Plastics</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Trade-in & Recycling Program</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Support & Store
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Authorized Sony Audio Dealers</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>2-Year Extended Protection</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Audio Specialist</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Order Status & Tracking</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#ffffff', letterSpacing: '0.1em' }}>SONY</span>
            <span>Copyright © 2026 Sony Corporation. All rights reserved.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={13} />
              <span>United States / English</span>
              <span>Build by Bhumika</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
