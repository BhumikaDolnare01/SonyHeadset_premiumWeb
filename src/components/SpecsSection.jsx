import React, { useState } from 'react';
import { Sliders, BatteryCharging, Bluetooth, Cpu, Radio, Shield, Weight, Sparkles } from 'lucide-react';

const SPEC_GROUPS = [
  {
    category: 'Audio Architecture',
    icon: Radio,
    items: [
      { label: 'Driver Unit', value: '40mm Dome Type (CCAW Voice Coil, Carbon Fiber Composite Dome)' },
      { label: 'Frequency Response (Active)', value: '4 Hz – 40,000 Hz (JEITA standard)' },
      { label: 'Frequency Response (Bluetooth)', value: '20 Hz – 40,000 Hz (LDAC 96 kHz sampling 990 kbps)' },
      { label: 'Audio Upscaling Engine', value: 'DSEE Extreme™ (Deep Learning Neural Network Model)' },
      { label: 'Immersive Format', value: '360 Reality Audio Certified with Personalized HRTF Calibration' },
      { label: 'Impedance / Sensitivity', value: '48 Ω (1 kHz) / 105 dB/mW (when powered via cable)' },
    ],
  },
  {
    category: 'Noise Cancellation & Voice',
    icon: Shield,
    items: [
      { label: 'Dedicated Processors', value: 'Dual Silicon: Integrated Processor V3 + HD Noise Cancelling Processor QN2' },
      { label: 'Microphone Array', value: '8 High-Precision Beamforming Mics (4 per cup) + Bone Conduction Sensor' },
      { label: 'Noise Optimization', value: 'Atmospheric Pressure Optimizer & Adaptive Sound Control AI' },
      { label: 'Transparency Mode', value: '20-Level Ambient Sound Control with Quick Attention Mode' },
      { label: 'Voice Pickup', value: 'AI Beamforming with Deep Neural Network Voice Isolation' },
    ],
  },
  {
    category: 'Battery & Power',
    icon: BatteryCharging,
    items: [
      { label: 'Playback Time (ANC ON)', value: 'Up to 40 Hours (Continuous music playback)' },
      { label: 'Playback Time (ANC OFF)', value: 'Up to 50 Hours (Continuous music playback)' },
      { label: 'Fast Charge (USB-PD)', value: '3 minutes charge = 5 hours playback' },
      { label: 'Full Charge Duration', value: 'Approx. 2.5 hours via USB Type-C' },
      { label: 'Charging Standard', value: 'USB Power Delivery (USB-PD) compliant' },
    ],
  },
  {
    category: 'Connectivity & Sensors',
    icon: Bluetooth,
    items: [
      { label: 'Bluetooth Version', value: 'Bluetooth® Core Specification Version 5.4' },
      { label: 'Supported Codecs', value: 'LDAC, AAC, SBC, LC3 (LE Audio ready)' },
      { label: 'Multipoint Connection', value: 'Simultaneous connection with two Bluetooth devices' },
      { label: 'Wearing Detection', value: 'Dual capacitive proximity sensors (auto play/pause)' },
      { label: 'Pairing Technology', value: 'Google Fast Pair, Microsoft Swift Pair, NFC Tap-to-Pair' },
    ],
  },
  {
    category: 'Design & Ergonomics',
    icon: Weight,
    items: [
      { label: 'Unit Weight', value: 'Approx. 245 g (8.64 oz)' },
      { label: 'Headband Mechanism', value: 'Stepless friction-damped silent slider' },
      { label: 'Earpad Cushions', value: 'Pressure-relieving Ultra-Soft Fit synthetic leather' },
      { label: 'Included in Box', value: 'Magnetic hard-shell travel case, USB-C cable (20cm), 3.5mm gold-plated audio cable (1.2m), In-flight plug adapter' },
    ],
  },
];

export default function SpecsSection({ onOpenPreorder }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="specs" style={{ padding: '120px 0', background: '#050505', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
          <div className="glow-pill" style={{ marginBottom: '16px' }}>
            <Sliders size={13} />
            <span>Engineering Metrics</span>
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
            Technical specifications.
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every component quantified. Built to lead the industry in acoustic fidelity, battery longevity, and computational silence.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {SPEC_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            const isSelected = activeCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  background: isSelected ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 16px rgba(0, 80, 255, 0.3)' : 'none',
                }}
              >
                <Icon size={15} />
                <span>{group.category}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details Card */}
        <div
          className="glass-card"
          style={{
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            maxWidth: '940px',
            margin: '0 auto',
            background: 'linear-gradient(145deg, rgba(14, 16, 22, 0.8) 0%, rgba(8, 8, 10, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
            {React.createElement(SPEC_GROUPS[activeCategory].icon, { size: 22, color: '#00d6ff' })}
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>
              {SPEC_GROUPS[activeCategory].category}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {SPEC_GROUPS[activeCategory].items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: i < SPEC_GROUPS[activeCategory].items.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                }}
              >
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 500 }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.92)', fontWeight: 600, lineHeight: 1.5 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom CTA within card */}
          <div
            style={{
              marginTop: '36px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
              Sony Electronics Inc. Flagship Audio Series 2026/2027
            </span>
            <button
              onClick={onOpenPreorder}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '13px' }}
            >
              <span>Pre-order WH-1000XM6</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
