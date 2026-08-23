import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitSuccess) onSubmitSuccess('Thank you for contacting Sneek Support! We will reply shortly.');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '32px',
          background: 'rgba(0, 54, 35, 0.95)',
          border: '2px solid var(--accent-yellow)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={24} color="#f3b316" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', margin: 0 }}>
              CONTACT <span style={{ color: 'var(--accent-yellow)' }}>US</span>
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#fff' }}>
            <CheckCircle2 size={56} color="#f3b316" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--accent-yellow)', marginBottom: '8px' }}>
              Message Sent Successfully!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-cream)' }}>
              Thank you for reaching out to Sneek Customer Care. We will get back to you within 2 hours.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(0, 44, 29, 0.8)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={20} color="#f3b316" />
                <span style={{ fontSize: '0.85rem', color: '#fff' }}>support@sneek-food.com</span>
              </div>
              <div style={{ background: 'rgba(0, 44, 29, 0.8)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={20} color="#f3b316" />
                <span style={{ fontSize: '0.85rem', color: '#fff' }}>+1 (800) 555-SNEEK</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-cream)', marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(0, 44, 29, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-cream)', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(0, 44, 29, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-cream)', marginBottom: '6px' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(0, 44, 29, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem',
                    resize: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-yellow" style={{ padding: '14px', width: '100%', marginTop: '8px' }}>
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
