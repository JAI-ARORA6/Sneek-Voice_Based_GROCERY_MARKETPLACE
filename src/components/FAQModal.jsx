import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQModal({ isOpen, onClose }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How does the Voice Command Shopping Assistant work?',
      a: 'Simply tap the microphone button or use the text input and speak in natural English (e.g. "Add 5 apples", "Remove milk", "Find toothpaste under $5"). Our client-side NLP engine extracts the action, quantity, price thresholds, and item names instantly.'
    },
    {
      q: 'Can I specify price limits or budget constraints?',
      a: 'Yes! You can say commands like "Find fruits under $3" or "Toothpaste below $5". Sneek will filter catalog items to match your exact budget.'
    },
    {
      q: 'What happens if I ask for Almond Milk or Oat Milk?',
      a: 'Sneek uses strict relevance scoring to distinguish Almond Milk, Oat Milk, and Whole Milk as distinct products. Adding Almond Milk will add Almond Milk ($3.99) directly to your shopping list.'
    },
    {
      q: 'Which languages are supported?',
      a: 'Sneek supports voice commands in English (US), Spanish (Español), French (Français), German (Deutsch), and Hindi (हिन्दी). You can switch your preferred language in the top navigation bar.'
    },
    {
      q: 'Is my voice data private?',
      a: 'Yes! All NLP intent parsing, catalog matching, and list management run client-side in your browser for zero latency and privacy.'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '32px',
          background: 'rgba(0, 54, 35, 0.95)',
          border: '2px solid var(--accent-yellow)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={26} color="#f3b316" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', margin: 0 }}>
              FREQUENTLY ASKED <span style={{ color: 'var(--accent-yellow)' }}>QUESTIONS</span>
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(0, 44, 29, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span>{faq.q}</span>
                {openIdx === idx ? <ChevronUp size={20} color="#f3b316" /> : <ChevronDown size={20} color="#f3b316" />}
              </button>

              {openIdx === idx && (
                <div style={{ padding: '0 20px 16px', fontSize: '0.92rem', color: 'var(--text-cream)', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <button className="btn btn-yellow" onClick={onClose} style={{ padding: '12px 32px' }}>
            Close FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
