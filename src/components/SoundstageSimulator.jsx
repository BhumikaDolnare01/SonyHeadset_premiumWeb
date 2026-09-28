import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Shield, Radio, Wind, Train, Coffee, Disc, Headphones, Sparkles, Play, Pause } from 'lucide-react';

const ENVIRONMENTS = [
  { id: 'flight', name: 'Cabin 38,000ft', icon: Wind, rawDb: 84, attenuatedDb: 36, desc: 'Heavy jet turbine hum & air friction.' },
  { id: 'subway', name: 'Tokyo Metro', icon: Train, rawDb: 92, attenuatedDb: 44, desc: 'Steel-on-rail screech & track rumble.' },
  { id: 'cafe', name: 'Bustling Cafe', icon: Coffee, rawDb: 78, attenuatedDb: 32, desc: 'Background chatter & espresso machines.' },
  { id: 'studio', name: 'Mastering Studio', icon: Disc, rawDb: 35, attenuatedDb: 18, desc: 'Acoustically isolated room acoustics.' },
];

export default function SoundstageSimulator() {
  const [mode, setMode] = useState('anc'); // 'anc', 'ambient', 'spatial'
  const [activeEnv, setActiveEnv] = useState(ENVIRONMENTS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Animated Waveform Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      phase += 0.04;

      // Draw background frequency grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Waveform parameters based on mode
      let amplitude = 40;
      let frequency = 0.02;
      let waveColor = '#00d6ff';
      let inverseColor = 'rgba(255, 80, 80, 0.4)';

      if (mode === 'anc') {
        amplitude = 12; // heavily flattened!
        frequency = 0.03;
        waveColor = '#00d6ff';
      } else if (mode === 'ambient') {
        amplitude = 50; // passing ambient audio
        frequency = 0.04;
        waveColor = '#38ef7d';
      } else if (mode === 'spatial') {
        amplitude = 35;
        frequency = 0.015;
        waveColor = '#0050ff';
      }

      // Draw raw incoming external noise curve (reddish/dim)
      if (mode === 'anc') {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 80, 80, 0.25)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const rawAmp = 45;
          const y = centerY + Math.sin(x * 0.025 + phase * 1.5) * rawAmp + Math.cos(x * 0.01 - phase) * (rawAmp * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw generated anti-noise wave (inverse wave)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 214, 255, 0.35)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const rawAmp = 45;
          const y = centerY - (Math.sin(x * 0.025 + phase * 1.5) * rawAmp + Math.cos(x * 0.01 - phase) * (rawAmp * 0.5));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw resulting residual audio wave (primary glowing line)
      ctx.beginPath();
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = waveColor;
      ctx.shadowBlur = 15;

      for (let x = 0; x < width; x++) {
        let y = centerY;
        if (mode === 'anc') {
          // Flat, whisper quiet
          y = centerY + Math.sin(x * frequency + phase * 2) * amplitude * Math.sin(x * 0.005);
        } else if (mode === 'ambient') {
          // Rich lively sound
          y = centerY + Math.sin(x * frequency + phase) * amplitude + Math.cos(x * 0.02 + phase * 1.2) * (amplitude * 0.4);
        } else if (mode === 'spatial') {
          // Smooth 3D pulsing harmonic
          y = centerY + Math.sin(x * frequency + phase * 1.2) * amplitude * Math.cos(phase * 0.5);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw frequency spectrum vertical bars below
      const barCount = 48;
      const barWidth = width / barCount;
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.max(4, Math.abs(Math.sin(i * 0.3 + phase * 2) * (mode === 'anc' ? 14 : 45)));
        const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
        grad.addColorStop(0, 'rgba(0, 80, 255, 0.05)');
        grad.addColorStop(1, mode === 'anc' ? 'rgba(0, 214, 255, 0.3)' : 'rgba(56, 239, 125, 0.4)');
        ctx.fillStyle = grad;
        ctx.fillRect(i * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mode]);

  // Audio tone generation for realistic interactive feel
  const toggleAudioSynthesis = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (isPlayingAudio) {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        }
        setIsPlayingAudio(false);
      } else {
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm harmonic sub-drone representing studio acoustic resonance
        osc.type = mode === 'anc' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(mode === 'anc' ? 55 : 220, ctx.currentTime);

        gain.gain.setValueAtTime(0.015, ctx.currentTime); // gentle, unobtrusive
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlayingAudio(true);
      }
    } catch (e) {
      console.warn('Audio synthesis not supported or blocked:', e);
    }
  };

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (_) {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <section id="soundstage" style={{ padding: '120px 0', background: '#050505', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
          <div className="glow-pill" style={{ marginBottom: '16px' }}>
            <Radio size={13} />
            <span>Interactive Acoustic Laboratory</span>
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
            Experience pure acoustic silence.
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Toggle between the dual QN2 processor cancellation modes and simulate real-world ambient sound reduction in real time.
          </p>
        </div>

        {/* Simulator Studio Box */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'radial-gradient(circle at top center, rgba(0, 80, 255, 0.08) 0%, rgba(10, 10, 14, 0.95) 80%)',
          }}
        >
          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}
          >
            {[
              { id: 'anc', label: 'Active Noise Cancelling', badge: '-48dB Attenuation' },
              { id: 'ambient', label: 'Ambient Transparency', badge: '20 Natural Levels' },
              { id: 'spatial', label: '360 Reality Audio', badge: '3D Spatial Sphere' },
            ].map((tab) => {
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id)}
                  style={{
                    background: isActive ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.04)',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '12px 22px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 8px 24px rgba(0, 80, 255, 0.4)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{tab.label}</span>
                  <span style={{ fontSize: '11px', color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)' }}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Oscilloscope Canvas */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '240px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#040406',
              border: '1px solid rgba(0, 214, 255, 0.2)',
              marginBottom: '28px',
            }}
          >
            <canvas
              ref={canvasRef}
              width={900}
              height={240}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />

            {/* Canvas Legend Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {mode === 'anc' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '2px', background: 'rgba(255, 80, 80, 0.7)' }} />
                    <span style={{ color: 'rgba(255, 80, 80, 0.8)' }}>Ambient Noise</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '2px', borderTop: '2px dashed rgba(0, 214, 255, 0.7)' }} />
                    <span style={{ color: 'rgba(0, 214, 255, 0.8)' }}>QN2 Anti-Noise</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '3px', background: '#00d6ff' }} />
                    <span style={{ color: '#fff' }}>Whisper Result (Silence)</span>
                  </div>
                </>
              )}
              {mode === 'ambient' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38ef7d' }} />
                  <span style={{ color: '#38ef7d' }}>Voice & Awareness Feed Active</span>
                </div>
              )}
              {mode === 'spatial' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0050ff' }} />
                  <span style={{ color: '#00d6ff' }}>HRTF 360 Spatial Object Field</span>
                </div>
              )}
            </div>

            {/* Audio Synthesis Toggle */}
            <button
              onClick={toggleAudioSynthesis}
              style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: isPlayingAudio ? 'rgba(0, 214, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: isPlayingAudio ? '#00d6ff' : 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {isPlayingAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{isPlayingAudio ? 'Tone Active' : 'Listen Tone'}</span>
            </button>
          </div>

          {/* Environmental Sound Presets & Decibel Attenuation Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {ENVIRONMENTS.map((env) => {
              const isSelected = activeEnv.id === env.id;
              const Icon = env.icon;
              return (
                <div
                  key={env.id}
                  onClick={() => setActiveEnv(env)}
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(0, 80, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid rgba(0, 214, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={16} color={isSelected ? '#00d6ff' : 'rgba(255,255,255,0.5)'} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{env.name}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: isSelected ? '#00d6ff' : 'rgba(255,255,255,0.4)' }}>
                      -{env.rawDb - env.attenuatedDb} dB
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4, marginBottom: '12px' }}>
                    {env.desc}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: 'rgba(255, 80, 80, 0.7)' }}>Raw: {env.rawDb}dB</span>
                    <span style={{ color: '#00d6ff', fontWeight: 600 }}>With XM6: {env.attenuatedDb}dB</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
