import React, { useState } from 'react';
import { Cpu, Layers, Disc, Volume2, Shield, Sparkles, ChevronRight, Activity } from 'lucide-react';

const COMPONENTS = [
  {
    id: 'driver',
    name: '40mm Carbon-Composite Driver',
    category: 'Transducer Architecture',
    stat: '4Hz – 40,000Hz',
    statLabel: 'Frequency Response',
    description: 'Precision-molded with a high-rigidity carbon fiber composite dome and polyurethane edge, engineered to handle thunderous sub-bass without harmonic breakup.',
    points: ['Liquid Crystal Polymer dome', 'Neodymium grade N52 magnet ring', 'Zero magnetic leakage chassis'],
  },
  {
    id: 'processor',
    name: 'Integrated Processor V3 & HD QN2',
    category: 'Silicon & DSP',
    stat: '700M ops/sec',
    statLabel: 'Real-Time Noise Sampling',
    description: 'A custom silicon pairing that orchestrates 8 microphones across both earcups to calculate inverse soundwaves with imperceptible sub-millisecond latency.',
    points: ['Dual dedicated 32-bit audio DSPs', 'Ultra-low jitter master clock', 'DSEE Extreme™ AI model upscaling'],
  },
  {
    id: 'mics',
    name: '8-Microphone Beamforming Array',
    category: 'Acoustic Sensing',
    stat: '-48 dB',
    statLabel: 'Peak Noise Attenuation',
    description: 'Strategically angled external and feed-forward microphones calibrated to capture wind, traffic, and jet turbine frequencies while isolating human speech.',
    points: ['Wind noise reduction structure', 'Precise voice pickup algorithm', 'Bone-conduction sensor correlation'],
  },
  {
    id: 'chamber',
    name: 'Acoustic Pressure Equalizer',
    category: 'Airflow Physics',
    stat: '0.02 Pa',
    statLabel: 'Tympanic Balance',
    description: 'Micro-perforated acoustic resistance mesh equalizes internal air pressure, eliminating the "cabin pressure" sensation common to heavy noise cancellation.',
    points: ['Sealed acoustic labyrinth', 'Non-turbulent port geometry', 'Acoustic absorption felt liner'],
  },
  {
    id: 'cushion',
    name: 'Ultra-Soft Fit Synthetic Leather',
    category: 'Ergonomic Interface',
    stat: '245 grams',
    statLabel: 'Featherlight Distribution',
    description: 'Newly developed synthetic leather with 20% lower elasticity resistance wraps high-density slow-recovery foam, conforming to glasses frames with zero acoustic leak.',
    points: ['Seamless thermo-compression seam', 'Asymmetrical cup geometry', 'Silent stepless slider mechanism'],
  },
];

export default function EngineeringDeepDive({ onOpenPreorder }) {
  const [selectedComponent, setSelectedComponent] = useState(COMPONENTS[0]);

  return (
    <section id="technology" style={{ padding: '120px 0', background: '#070709', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 70px' }}>
          <div className="glow-pill" style={{ marginBottom: '16px' }}>
            <Cpu size={13} />
            <span>X-Series Acoustic Engineering</span>
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
            Anatomy of flawless sound.
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every millimeter of the WH-1000XM6 is an obsession with acoustic perfection. Explore the exploded
            layer blueprint engineered to silence the outside world.
          </p>
        </div>

        {/* Blueprint Visual Showcase */}
        <div
          className="glass-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            marginBottom: '40px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'radial-gradient(ellipse at center, rgba(0, 80, 255, 0.08) 0%, #08080a 70%)',
          }}
        >
          {/* High-res exploded blueprint banner */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
            }}
          >
            <img
              src="/assets/exploded-blueprint.png"
              alt="Sony WH-1000XM6 Exploded Architecture"
              style={{
                width: '100%',
                maxHeight: '480px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 50px rgba(0, 80, 255, 0.25))',
              }}
            />

            {/* Floating Blueprint Badges */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(5, 5, 5, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d6ff' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>
                EXPLODED CAD VIEW // XM6-SPEC-01
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <span>12 Precision Layers</span>
              <span>•</span>
              <span>100% Recycled Rare Earths</span>
            </div>
          </div>
        </div>

        {/* Interactive Component Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Selector List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {COMPONENTS.map((item) => {
              const isSelected = selectedComponent.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedComponent(item)}
                  style={{
                    padding: '20px 24px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(0, 80, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #00d6ff' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: isSelected ? '#00d6ff' : 'rgba(255,255,255,0.4)' }}>
                      {item.category}
                    </span>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                      {item.name}
                    </h4>
                  </div>
                  <ChevronRight size={18} color={isSelected ? '#00d6ff' : 'rgba(255,255,255,0.3)'} />
                </div>
              );
            })}
          </div>

          {/* Component Deep Detail Panel */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              borderRadius: '20px',
              border: '1px solid rgba(0, 214, 255, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(145deg, rgba(16, 20, 32, 0.8) 0%, rgba(8, 8, 12, 0.9) 100%)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="glow-pill">{selectedComponent.category}</span>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#00d6ff', letterSpacing: '-0.02em' }}>
                    {selectedComponent.stat}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                    {selectedComponent.statLabel}
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                {selectedComponent.name}
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
                {selectedComponent.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {selectedComponent.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0050ff' }} />
                    <span style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.75)' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color="#00d6ff" />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Sony Acoustics Laboratory Tokyo</span>
              </div>
              <button
                onClick={onOpenPreorder}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00d6ff',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
              >
                <span>Reserve Unit</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
