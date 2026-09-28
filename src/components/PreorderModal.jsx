import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, RotateCcw, Sparkles, CreditCard, ArrowRight } from 'lucide-react';

const FINISHES = [
  { id: 'platinum', name: 'Platinum Silver / Sand', price: 449.99, image: '/assets/hero-beauty.png' },
  { id: 'charcoal', name: 'Matte Charcoal Black', price: 449.99, image: '/sequence/ezgif-frame-001.jpg' },
  { id: 'sandpink', name: 'Silken Sand Pink', price: 449.99, image: '/assets/sand-pink.webp' },
];

export default function PreorderModal({ isOpen, onClose }) {
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [engravingText, setEngravingText] = useState('');
  const [tradeInOption, setTradeInOption] = useState('none');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const tradeInDiscounts = {
    none: 0,
    xm5: 180,
    xm4: 120,
    airpods: 130,
    bose: 110,
  };

  const discount = tradeInDiscounts[tradeInOption] || 0;
  const finalPrice = Math.max(0, selectedFinish.price - discount);

  const handleCompleteOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      // Keep state for nice feedback
    }, 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0a0a0d',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '36px',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 80, 255, 0.15)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
        >
          <X size={18} />
        </button>

        {!isOrdered ? (
          <div>
            {/* Modal Header */}
            <div style={{ marginBottom: '28px' }}>
              <div className="glow-pill" style={{ marginBottom: '12px' }}>
                <Sparkles size={12} />
                <span>Priority Allocation // Global Launch</span>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Reserve Sony WH-1000XM6
              </h2>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Estimated dispatch in 2 business days. Complimentary express insured shipping included.
              </p>
            </div>

            {/* Split Content: Preview & Configuration */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
              {/* Product Preview Stage */}
              <div
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 80, 255, 0.08) 0%, rgba(5, 5, 5, 0.8) 80%)',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  minHeight: '260px',
                }}
              >
                <img
                  src={selectedFinish.image}
                  alt={selectedFinish.name}
                  style={{
                    maxHeight: '220px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.8))',
                  }}
                />

                {/* Laser Engraving Visual Live Simulation */}
                {engravingText.trim() && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(10, 10, 14, 0.85)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 214, 255, 0.4)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: '#00d6ff',
                      letterSpacing: '0.1em',
                    }}
                  >
                    ENGRAVED: "{engravingText.toUpperCase()}"
                  </div>
                )}
              </div>

              {/* Options Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. Finish Selection */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.5)' }}>
                    1. Choose Finish
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    {FINISHES.map((f) => {
                      const isSel = selectedFinish.id === f.id;
                      return (
                        <div
                          key={f.id}
                          onClick={() => setSelectedFinish(f)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: isSel ? 'rgba(0, 80, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                            border: isSel ? '1px solid #00d6ff' : '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span style={{ fontSize: '13.5px', fontWeight: isSel ? 600 : 400, color: isSel ? '#fff' : 'rgba(255,255,255,0.75)' }}>
                            {f.name}
                          </span>
                          {isSel && <Check size={16} color="#00d6ff" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Complimentary Laser Engraving */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.5)' }}>
                    2. Complimentary Laser Engraving (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={18}
                    placeholder="Enter initials or name (e.g. SONY AUDIO)"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 3. Trade-in credit */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.5)' }}>
                    3. Trade-in & Save
                  </label>
                  <select
                    value={tradeInOption}
                    onChange={(e) => setTradeInOption(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#121217',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="none">No trade-in</option>
                    <option value="xm5">Sony WH-1000XM5 (Save $180)</option>
                    <option value="xm4">Sony WH-1000XM4 (Save $120)</option>
                    <option value="airpods">Apple AirPods Max (Save $130)</option>
                    <option value="bose">Bose QuietComfort Ultra (Save $110)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price Summary & Purchase Action */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                    ${finalPrice.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'line-through' }}>
                      ${selectedFinish.price}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#00d6ff' }}>
                  or ${(finalPrice / 12).toFixed(2)}/mo for 12 months with 0% APR
                </p>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '15px' }}
              >
                <span>Confirm Reservation</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Perks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '11.5px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="#00d6ff" />
                <span>Free 2-day delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} color="#00d6ff" />
                <span>30-day trial guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#00d6ff" />
                <span>2-year Sony limited warranty</span>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation Success State */
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 214, 255, 0.15)',
                border: '2px solid #00d6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 30px rgba(0, 214, 255, 0.5)',
              }}
            >
              <Check size={32} color="#00d6ff" strokeWidth={3} />
            </div>

            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              Reservation Confirmed
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px' }}>
              Thank you for reserving your Sony WH-1000XM6 in <strong>{selectedFinish.name}</strong>. Your allocation is locked with priority dispatch.
            </p>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '16px',
                maxWidth: '380px',
                margin: '0 auto 28px',
                textAlign: 'left',
                fontSize: '12.5px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
              }}
            >
              <p><strong>Order Ref:</strong> SONY-XM6-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Total:</strong> ${finalPrice.toFixed(2)}</p>
              {engravingText && <p><strong>Custom Laser Engraving:</strong> "{engravingText.toUpperCase()}"</p>}
              <p><strong>Delivery:</strong> Insured Express (2 Days)</p>
            </div>

            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '12px 30px' }}
            >
              <span>Return to Experience</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
