import React from 'react';
import { Mic, Volume2, VolumeX, Search, Globe, ShoppingBag, MapPin } from 'lucide-react';

export default function Navbar({
  currentLang,
  onLangChange,
  isMuted,
  onToggleMute,
  onOpenSearch,
  totalItems,
  totalCost,
  onOpenModal
}) {
  const languages = [
    { code: 'en-US', label: 'English' },
    { code: 'es-ES', label: 'Español' },
    { code: 'fr-FR', label: 'Français' },
    { code: 'de-DE', label: 'Deutsch' },
    { code: 'hi-IN', label: 'हिन्दी' }
  ];

  const handleScrollToProducts = () => {
    document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        padding: '18px 32px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'rgba(0, 71, 47, 0.4)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1.5px solid var(--border-glass)'
      }}
    >
      {/* Brand & Sneek Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--accent-yellow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(243, 179, 22, 0.4)',
            color: '#111827',
            fontSize: '1.4rem'
          }}
        >
          🥑
        </div>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, letterSpacing: '0.5px', color: '#fff' }}>
            SNEEK
          </h1>
          <span style={{ fontSize: '0.72rem', color: '#e6f7f0', fontWeight: 600, letterSpacing: '0.5px' }}>
            VOICE FOOD & GROCERY MARKETPLACE
          </span>
        </div>
      </div>

      {/* Nav Links from Reference Image */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.92rem', fontWeight: 600 }}>
        <span onClick={handleScrollToProducts} style={{ color: '#fff', cursor: 'pointer', borderBottom: '2px solid var(--accent-yellow)', paddingBottom: '2px' }}>
          Product
        </span>
        <span onClick={() => onOpenModal('whySneek')} style={{ color: '#e6f7f0', cursor: 'pointer', opacity: 0.9 }}>
          Why Sneek
        </span>
        <span onClick={() => onOpenModal('faq')} style={{ color: '#e6f7f0', cursor: 'pointer', opacity: 0.9 }}>
          FAQ
        </span>
        <span onClick={() => onOpenModal('contact')} style={{ color: '#e6f7f0', cursor: 'pointer', opacity: 0.9 }}>
          Contact
        </span>
      </div>

      {/* Action Controls & Cart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Cart Counter Pill (Clickable to open Cart & Checkout Modal) */}
        <button
          onClick={() => onOpenModal('cart')}
          className="btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(243, 179, 22, 0.15)',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1.5px solid var(--accent-yellow)',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(243, 179, 22, 0.25)',
            transition: 'all 0.25s ease'
          }}
          title="Click to view cart & place order"
        >
          <ShoppingBag size={18} color="#f3b316" />
          <strong style={{ fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{totalItems} items</span>
            <span style={{ color: 'var(--accent-yellow)' }}>(${totalCost.toFixed(2)})</span>
          </strong>
        </button>

        {/* Locate / Voice Search Pill */}
        <button
          onClick={onOpenSearch}
          className="btn btn-yellow"
          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <MapPin size={15} /> Voice Search
        </button>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: '10px' }}>
          <Globe size={16} color="#f3b316" />
          <select
            value={currentLang}
            onChange={(e) => onLangChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} style={{ background: '#005e3f', color: '#fff' }}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mute TTS Audio Toggle */}
        <button
          onClick={onToggleMute}
          className="btn btn-secondary"
          style={{ padding: '8px', borderRadius: '50%' }}
          title={isMuted ? 'Unmute Audio Voice Assistant' : 'Mute Audio Voice Assistant'}
        >
          {isMuted ? <VolumeX size={18} color="#f43f5e" /> : <Volume2 size={18} color="#f3b316" />}
        </button>
      </div>
    </header>
  );
}
