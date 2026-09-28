import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  ChevronDown, 
  Sparkles, 
  Cpu, 
  Mic, 
  Radio, 
  Volume2, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Sliders, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

const TOTAL_FRAMES = 300;
const PEAK_FRAME = 290;

export default function HeroSequence({ onOpenPreorder }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeAncMode, setActiveAncMode] = useState('max');

  // Animation lerp state
  const scrollProgressRef = useRef(0);
  const renderProgressRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    const images = [];

    // Preload priority frames first
    const loadFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(index).padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          if (!isCancelled) {
            images[index] = img;
            loadedCountRef.current += 1;
            const progress = Math.min(100, Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));
            setLoadingProgress(progress);
            if (loadedCountRef.current >= 20) {
              setIsReady(true);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Load initial batch immediately
    const loadInitial = async () => {
      const initialPromises = [];
      for (let i = 1; i <= 30; i++) {
        initialPromises.push(loadFrame(i));
      }
      await Promise.all(initialPromises);
      if (!isCancelled) {
        imagesRef.current = images;
      }

      // Load remaining frames in batches to avoid network congestion
      const batchSize = 25;
      for (let start = 31; start <= TOTAL_FRAMES; start += batchSize) {
        if (isCancelled) break;
        const batch = [];
        for (let i = start; i < Math.min(start + batchSize, TOTAL_FRAMES + 1); i++) {
          batch.push(loadFrame(i));
        }
        await Promise.all(batch);
      }
    };

    loadInitial();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Frame calculation based on scroll progress
  // 0.0 -> 0.82: explode from frame 1 to 290
  // 0.82 -> 1.00: reassemble from frame 290 back to frame 1
  const getFrameIndex = useCallback((progress) => {
    const p = Math.max(0, Math.min(1, progress));
    if (p <= 0.82) {
      const factor = p / 0.82;
      return Math.max(1, Math.min(PEAK_FRAME, Math.round(1 + factor * (PEAK_FRAME - 1))));
    } else {
      const reassembleFactor = (p - 0.82) / (1.0 - 0.82);
      return Math.max(1, Math.min(PEAK_FRAME, Math.round(PEAK_FRAME - reassembleFactor * (PEAK_FRAME - 1))));
    }
  }, []);

  // Canvas drawing routine
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx] || imagesRef.current[1];
    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fill with pristine deep charcoal #050505
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // Compute aspect-fit scaling
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Screen is wider than image
      drawHeight = height * 0.92;
      drawWidth = drawHeight * imgRatio;
    } else {
      // Screen is taller than image
      drawWidth = width * 0.94;
      drawHeight = drawWidth / imgRatio;
    }

    offsetX = (width - drawWidth) / 2;
    offsetY = (height - drawHeight) / 2;

    // Draw the headphone image frame
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Subtle edge blending gradient to eliminate any boundary
    // Top & bottom edge soft fade
    const edgeGradient = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.35,
      width / 2, height / 2, Math.max(width, height) * 0.72
    );
    edgeGradient.addColorStop(0, 'rgba(5, 5, 5, 0)');
    edgeGradient.addColorStop(0.85, 'rgba(5, 5, 5, 0.4)');
    edgeGradient.addColorStop(1, 'rgba(5, 5, 5, 1)');
    ctx.fillStyle = edgeGradient;
    ctx.fillRect(0, 0, width, height);

    // Studio watermark masking (bottom right corner)
    // Seamlessly blend away the subtle generator mark into deep void
    const brGrad = ctx.createRadialGradient(
      offsetX + drawWidth * 0.92, offsetY + drawHeight * 0.88, 5,
      offsetX + drawWidth * 0.92, offsetY + drawHeight * 0.88, drawWidth * 0.14
    );
    brGrad.addColorStop(0, '#050505');
    brGrad.addColorStop(0.7, 'rgba(5, 5, 5, 0.96)');
    brGrad.addColorStop(1, 'rgba(5, 5, 5, 0)');
    ctx.fillStyle = brGrad;
    ctx.beginPath();
    ctx.arc(offsetX + drawWidth * 0.92, offsetY + drawHeight * 0.88, drawWidth * 0.14, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(getFrameIndex(renderProgressRef.current));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame, getFrameIndex]);

  // Scroll and Animation loop with smooth lerp
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      scrollProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let lastFrame = -1;

    const animate = () => {
      // Buttery smooth lerp interpolation
      const target = scrollProgressRef.current;
      renderProgressRef.current += (target - renderProgressRef.current) * 0.12;

      const progress = renderProgressRef.current;
      setCurrentProgress(progress);

      const frameIdx = getFrameIndex(progress);
      if (frameIdx !== lastFrame) {
        lastFrame = frameIdx;
        renderFrame(frameIdx);
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame, getFrameIndex]);

  // Helper for computing beat opacity and transforms
  const getBeatStyle = (start, peak, end) => {
    const p = currentProgress;
    let opacity = 0;
    let translateY = 20;

    if (p >= start && p <= end) {
      if (p <= peak) {
        const factor = (p - start) / (peak - start);
        opacity = factor;
        translateY = 20 * (1 - factor);
      } else {
        const factor = (end - p) / (end - peak);
        opacity = factor;
        translateY = -20 * (1 - factor);
      }
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      visibility: opacity > 0.02 ? 'visible' : 'hidden',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    };
  };

  const jumpToBeat = (targetP) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + targetP * scrollableHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div id="overview" ref={containerRef} className="scrolly-container">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="scrolly-sticky">
        {/* Soft background blue ambient glow */}
        <div 
          className="scrolly-glow"
          style={{
            opacity: currentProgress > 0.1 && currentProgress < 0.85 ? 1 : 0.45,
          }}
        />

        {/* HTML5 High-Performance Canvas */}
        <canvas ref={canvasRef} className="scrolly-canvas" />

        {/* Loading Overlay (fades out gracefully) */}
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#050505',
              zIndex: 50,
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.14em', color: '#fff' }}>SONY</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#00d6ff' }}>WH-1000XM6</span>
            </div>
            <div
              style={{
                width: '160px',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${loadingProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #0050ff, #00d6ff)',
                  transition: 'width 0.2s ease',
                }}
              />
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              CALIBRATING ACOUSTIC SEQUENCE {loadingProgress}%
            </p>
          </div>
        )}

        {/* Interactive Exploded Hotspots (active during disassembled state 38% - 80%) */}
        {currentProgress >= 0.38 && currentProgress <= 0.82 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 15,
              pointerEvents: 'none',
            }}
          >
            {/* Hotspot 1: Driver Diaphragm */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '38%',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => setActiveHotspot(activeHotspot === 'driver' ? null : 'driver')}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(0, 214, 255, 0.2)',
                  border: '1px solid #00d6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(0, 214, 255, 0.6)',
                  animation: 'pulse 2s infinite',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d6ff' }} />
              </div>

              {activeHotspot === 'driver' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '36px',
                    left: '-100px',
                    width: '220px',
                    padding: '14px',
                    background: 'rgba(10, 10, 14, 0.92)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 214, 255, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                    zIndex: 20,
                  }}
                >
                  <p style={{ fontSize: '11px', color: '#00d6ff', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Component 01
                  </p>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: '4px 0' }}>
                    40mm Carbon Driver
                  </h4>
                  <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    Custom liquid crystal polymer dome reproduces frequencies up to 40kHz with zero distortion.
                  </p>
                </div>
              )}
            </div>

            {/* Hotspot 2: QN2 Processor */}
            <div
              style={{
                position: 'absolute',
                top: '46%',
                left: '26%',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => setActiveHotspot(activeHotspot === 'chip' ? null : 'chip')}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(0, 80, 255, 0.25)',
                  border: '1px solid #0050ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(0, 80, 255, 0.6)',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0050ff' }} />
              </div>

              {activeHotspot === 'chip' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '36px',
                    left: '-80px',
                    width: '220px',
                    padding: '14px',
                    background: 'rgba(10, 10, 14, 0.92)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 80, 255, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                    zIndex: 20,
                  }}
                >
                  <p style={{ fontSize: '11px', color: '#0050ff', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Silicon Architecture
                  </p>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: '4px 0' }}>
                    Sony QN2 Processor
                  </h4>
                  <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    Dual multi-core silicon delivering 700M calculations/sec for adaptive real-time noise cancellation.
                  </p>
                </div>
              )}
            </div>

            {/* Hotspot 3: Cushion & Isolation */}
            <div
              style={{
                position: 'absolute',
                top: '55%',
                left: '74%',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => setActiveHotspot(activeHotspot === 'cushion' ? null : 'cushion')}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
              </div>

              {activeHotspot === 'cushion' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '36px',
                    right: '-40px',
                    width: '220px',
                    padding: '14px',
                    background: 'rgba(10, 10, 14, 0.92)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                    zIndex: 20,
                  }}
                >
                  <p style={{ fontSize: '11px', color: '#fff', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Ergonomic Acoustic
                  </p>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: '4px 0' }}>
                    Ultra-Soft Fit Leather
                  </h4>
                  <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    Pressure-relieving urethane foam distributes clamping force evenly for uninterrupted 40-hour listening.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Narrative Axis — Storytelling Beats */}
        <div className="scrolly-overlay">

          {/* =========================================================
              BEAT 1: HERO / INTRO (0% - 15% scroll)
              Visual: WH-1000XM6 fully assembled in 3/4 angle, rim light.
              Centered, bold, confident, editorial copy.
             ========================================================= */}
          <div
            className="story-beat"
            style={{
              ...getBeatStyle(0.0, 0.05, 0.16),
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="glow-pill" style={{ marginBottom: '20px' }}>
              <Sparkles size={13} />
              <span>The Next Chapter In Sound</span>
            </div>

            <h1
              className="text-gradient"
              style={{
                fontSize: 'clamp(44px, 7.5vw, 92px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.02,
                marginBottom: '16px',
                textShadow: '0 4px 30px rgba(0, 80, 255, 0.2)',
              }}
            >
              Sony WH-1000XM6
            </h1>

            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 38px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '18px',
              }}
            >
              Silence, perfected.
            </h2>

            <p
              style={{
                fontSize: 'clamp(15px, 1.6vw, 19px)',
                color: 'var(--text-secondary)',
                maxWidth: '620px',
                lineHeight: 1.6,
                marginBottom: '32px',
                fontWeight: 400,
              }}
            >
              Flagship wireless noise cancelling, re-engineered for a world that never stops.
            </p>

            {/* Scroll Indicator */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.45)',
                }}
              >
                Scroll to explore engineering
              </span>
              <div
                style={{
                  width: '22px',
                  height: '36px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '6px',
                }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '8px',
                    borderRadius: '2px',
                    background: '#00d6ff',
                    animation: 'scrollBob 1.8s infinite ease-in-out',
                  }}
                />
              </div>
            </div>
          </div>


          {/* =========================================================
              BEAT 2: ENGINEERING REVEAL (15% - 40% scroll)
              Visual: Cups drift away, headband lifts, structure opens.
              Left aligned, technical yet poetic copy.
             ========================================================= */}
          <div
            className="story-beat"
            style={{
              ...getBeatStyle(0.18, 0.28, 0.38),
              maxWidth: '560px',
              marginRight: 'auto',
              textAlign: 'left',
            }}
          >
            <div className="glow-pill" style={{ marginBottom: '18px' }}>
              <Layers size={13} />
              <span>Acoustic Architecture</span>
            </div>

            <h2
              className="text-gradient"
              style={{
                fontSize: 'clamp(34px, 4.8vw, 62px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '20px',
              }}
            >
              Precision-engineered for silence.
            </h2>

            <p
              style={{
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '16px',
              }}
            >
              Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
            </p>

            <p
              style={{
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              Every component is tuned for balance, power, and comfort—hour after hour.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Zap size={14} color="#00d6ff" />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                  Aero-Acoustic Seal
                </span>
              </div>

              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Cpu size={14} color="#0050ff" />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                  Liquid Crystal Dome
                </span>
              </div>
            </div>
          </div>


          {/* =========================================================
              BEAT 3: NOISE CANCELLING & MICROPHONES (40% - 65% scroll)
              Visual: Components spread further, mic array and boards.
              Right aligned, intelligence & adaptation focus.
             ========================================================= */}
          <div
            className="story-beat"
            style={{
              ...getBeatStyle(0.42, 0.52, 0.62),
              maxWidth: '560px',
              marginLeft: 'auto',
              textAlign: 'left',
            }}
          >
            <div className="glow-pill" style={{ marginBottom: '18px' }}>
              <Mic size={13} />
              <span>Multi-Directional Sensing</span>
            </div>

            <h2
              className="text-gradient"
              style={{
                fontSize: 'clamp(34px, 4.8vw, 62px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '20px',
              }}
            >
              Adaptive noise cancelling, redefined.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {[
                { title: 'Multi-microphone array', desc: 'Listens in every direction with 8 precision beamforming capsules.' },
                { title: 'Real-time noise analysis', desc: 'QN2 chip samples ambient interference 700 times per millisecond.' },
                { title: 'Pure acoustic isolation', desc: 'Your music stays pure—planes, trains, and crowds fade away.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(0, 214, 255, 0.12)',
                      border: '1px solid rgba(0, 214, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '3px',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d6ff' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.92)' }}>{item.title}</h4>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.45 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mode Switcher pill */}
            <div
              style={{
                background: 'rgba(15, 15, 20, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '8px',
                display: 'inline-flex',
                gap: '6px',
                backdropFilter: 'blur(20px)',
              }}
            >
              {[
                { id: 'max', label: 'ANC Max' },
                { id: 'ambient', label: 'Ambient Sound' },
                { id: 'voice', label: 'Voice Focus' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveAncMode(mode.id)}
                  style={{
                    background: activeAncMode === mode.id ? 'var(--accent-gradient)' : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: activeAncMode === mode.id ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>


          {/* =========================================================
              BEAT 4: SOUND & UPSCALING (65% - 82% scroll)
              Visual: Peak exploded view: coils, magnets, diaphragm.
              Left aligned, audiophile heritage & AI upscaling.
             ========================================================= */}
          <div
            className="story-beat"
            style={{
              ...getBeatStyle(0.66, 0.74, 0.82),
              maxWidth: '560px',
              marginRight: 'auto',
              textAlign: 'left',
            }}
          >
            <div className="glow-pill" style={{ marginBottom: '18px' }}>
              <Radio size={13} />
              <span>Audiophile Heritage</span>
            </div>

            <h2
              className="text-gradient"
              style={{
                fontSize: 'clamp(34px, 4.8vw, 62px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '20px',
              }}
            >
              Immersive, lifelike sound.
            </h2>

            <p
              style={{
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '16px',
              }}
            >
              High-performance drivers unlock detail, depth, and texture in every track.
            </p>

            <p
              style={{
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { title: 'LDAC', subtitle: '990 kbps Hi-Res' },
                { title: 'DSEE AI', subtitle: 'Extreme Upscaling' },
                { title: '360 RA', subtitle: 'Spatial Sphere' },
              ].map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#00d6ff' }}>{spec.title}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{spec.subtitle}</p>
                </div>
              ))}
            </div>
          </div>


          {/* =========================================================
              BEAT 5: REASSEMBLY & CTA (85% - 100% scroll)
              Visual: Components glide back together into solid product.
              Centered, bold, iconic call to action.
             ========================================================= */}
          <div
            className="story-beat"
            style={{
              ...getBeatStyle(0.85, 0.94, 1.0),
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="glow-pill" style={{ marginBottom: '18px' }}>
              <ShieldCheck size={13} />
              <span>The Icon Reassembled</span>
            </div>

            <h2
              className="text-gradient"
              style={{
                fontSize: 'clamp(38px, 6.2vw, 76px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                marginBottom: '16px',
              }}
            >
              Hear everything. Feel nothing else.
            </h2>

            <p
              style={{
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}
            >
              WH-1000XM6. Designed for focus, crafted for comfort.
            </p>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                maxWidth: '480px',
                marginBottom: '32px',
              }}
            >
              Engineered for airports, offices, and everything in between.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={onOpenPreorder}
                className="btn-primary"
                style={{ padding: '15px 36px', fontSize: '15px' }}
              >
                <span>Experience WH-1000XM6</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#specs"
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '14px' }}
              >
                <span>See Full Specs</span>
              </a>
            </div>
          </div>

        </div>

        {/* Apple-style Vertical Timeline Navigation Dots on the right edge */}
        <div
          style={{
            position: 'absolute',
            right: '28px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 25,
          }}
        >
          {[
            { label: '01 Overview', p: 0.05 },
            { label: '02 Architecture', p: 0.28 },
            { label: '03 Intelligence', p: 0.52 },
            { label: '04 Acoustics', p: 0.74 },
            { label: '05 Cohesion', p: 0.94 },
          ].map((item, idx) => {
            const isActive =
              (idx === 0 && currentProgress < 0.18) ||
              (idx === 1 && currentProgress >= 0.18 && currentProgress < 0.40) ||
              (idx === 2 && currentProgress >= 0.40 && currentProgress < 0.64) ||
              (idx === 3 && currentProgress >= 0.64 && currentProgress < 0.84) ||
              (idx === 4 && currentProgress >= 0.84);

            return (
              <button
                key={idx}
                onClick={() => jumpToBeat(item.p)}
                title={item.label}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <div
                  style={{
                    width: isActive ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: isActive ? '#00d6ff' : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: isActive ? '0 0 10px #00d6ff' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </button>
            );
          })}
        </div>

      </div>

      <style>{`
        @keyframes scrollBob {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.2;
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 16px rgba(0, 214, 255, 0.6);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 24px rgba(0, 214, 255, 0.9);
          }
        }
      `}</style>
    </div>
  );
}
