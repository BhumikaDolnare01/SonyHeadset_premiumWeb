import React, { useState } from 'react';
import { Palette, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';

const COLORWAYS = [
  {
    id: 'platinum',
    name: 'Platinum Silver / Sand',
    sub: 'Champagne Gold Accents',
    bgPreview: 'linear-gradient(135deg, #d8d0c5 0%, #b8aca0 100%)',
    image: '/assets/hero-beauty.png',
    accentColor: '#d8b08c',
    description: 'A warm, understated architectural hue inspired by limestone and mineral dunes. Accentuated with micro-brushed champagne gold hardware.',
    materials: 'Anodized magnesium sliders • Sandblasted matte polymer • Soft-touch memory foam',
  },
  {
    id: 'charcoal',
    name: 'Matte Charcoal Black',
    sub: 'Burnished Copper Detailing',
    bgPreview: 'linear-gradient(135deg, #1c1c1e 0%, #0d0d0f 100%)',
    image: '/sequence/ezgif-frame-001.jpg',
    accentColor: '#c87d55',
    description: 'The iconic stealth finish. Absorbs light across all angles with an anti-fingerprint oleophobic coating and deep copper engraved Sony typography.',
    materials: 'Oleophobic micro-textured surface • Recycled acoustic resin • Carbon fiber yoke',
  },
  {
    id: 'sandpink',
    name: 'Silken Sand Pink',
    sub: 'Rose Gold PVD Hinge',
    bgPreview: 'linear-gradient(135deg, #dfc8c3 0%, #b59b96 100%)',
    image: '/assets/sand-pink.webp',
    accentColor: '#e09f98',
    description: 'A soft, calming rose-tinted neutral crafted with physical vapor deposition (PVD) gold hinges for timeless luxury.',
    materials: 'PVD Rose-Gold hinge • Breathable synthetic leather • Featherlight 245g chassis',
  },
];

export default function ColorCustomizer({ onOpenPreorder }) {
  const [selectedColor, setSelectedColor] = useState(COLORWAYS[0]);

  return (
    <section id="finishes" style={{ padding: '120px 0', background: '#0a0a0c', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
          <div className="glow-pill" style={{ marginBottom: '16px' }}>
            <Palette size={13} />
            <span>Curated Material Finishes</span>
          </div>

          <h2
            className="text-gradient"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: '20px',
            }}
          >
            Crafted for the senses.
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every surface is refined for tactile serenity. Choose from three bespoke finishes engineered with recycled materials and aerospace alloys.
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div
          className="glass-card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(145deg, rgba(14, 14, 18, 0.8) 0%, rgba(6, 6, 8, 0.95) 100%)',
          }}
        >
          {/* Left: Dynamic Colorway Stage */}
          <div
            style={{
              position: 'relative',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            }}
          >
            <img
              key={selectedColor.id}
              src={selectedColor.image}
              alt={selectedColor.name}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '28px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(5, 5, 5, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedColor.accentColor }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{selectedColor.name}</span>
            </div>
          </div>

          {/* Right: Craftsmanship & Swatch Selector */}
          <div
            style={{
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00d6ff', fontWeight: 600 }}>
                Finish Selection
              </span>

              <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px', letterSpacing: '-0.02em' }}>
                {selectedColor.name}
              </h3>
              <p style={{ fontSize: '15px', color: selectedColor.accentColor, fontWeight: 500, marginBottom: '24px' }}>
                {selectedColor.sub}
              </p>

              {/* Color Swatch Circles */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}>
                {COLORWAYS.map((c) => {
                  const isSelected = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      title={c.name}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: c.bgPreview,
                        border: isSelected ? '3px solid #00d6ff' : '2px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 0 16px rgba(0, 214, 255, 0.4)' : 'none',
                      }}
                    >
                      {isSelected && <Check size={18} color="#000" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>

              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
                {selectedColor.description}
              </p>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  marginBottom: '32px',
                }}
              >
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Material Formulation
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>
                  {selectedColor.materials}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPreorder}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '15px' }}
            >
              <span>Pre-order in {selectedColor.name}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
