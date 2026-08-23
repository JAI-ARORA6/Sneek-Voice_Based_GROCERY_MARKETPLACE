import React from 'react';
import { X, Zap, ShieldCheck, Clock, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function WhySneekModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          padding: '32px',
          background: 'rgba(0, 54, 35, 0.95)',
          border: '2px solid var(--accent-yellow)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>🥑</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', margin: 0 }}>
              WHY <span style={{ color: 'var(--accent-yellow)' }}>SNEEK</span>?
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-cream)', lineHeight: 1.6, marginBottom: '28px' }}>
          Sneek is an AI-powered voice grocery marketplace built to revolutionize how you order fresh food, snacks, and daily essentials.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', background: 'rgba(0, 44, 29, 0.8)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#003623' }}>
              <Zap size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                Zero-Latency NLP Voice Recognition
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.5 }}>
                Speak in natural English, Spanish, French, German, or Hindi. Add 5 apples, reduce milk quantity, or search by price without clicking buttons.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', background: 'rgba(0, 44, 29, 0.8)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#003623' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                100% Certified Farm Fresh Produce
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.5 }}>
                Every fruit, vegetable, and dairy item is directly sourced from local certified organic farms for peak taste and nutritional value.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', background: 'rgba(0, 44, 29, 0.8)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#003623' }}>
              <RefreshCw size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                Smart AI Substitutes & Restock Alerts
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-cream)', lineHeight: 1.5 }}>
                Our AI continuously analyzes your reorder frequency and suggests healthy, lactose-free, or plant-based alternatives (like Almond Milk for Whole Milk).
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <button className="btn btn-yellow" onClick={onClose} style={{ padding: '12px 32px' }}>
            Got It! Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
