import React from 'react';
import { Mic, MicOff, ShoppingBag, Search, HelpCircle, Volume2, Globe } from 'lucide-react';

export default function FloatingVoiceController({
  isListening,
  onToggleListen,
  totalItems,
  totalCost,
  onOpenCart,
  onOpenSearch,
  onOpenHelp,
  interimTranscript,
  currentLang = 'en-US',
  onLangChange
}) {
  return (
    <div className="mobile-floating-bar">
      {/* Real-time Voice Live Indicator Pill */}
      {isListening && (
        <div className="voice-live-pill">
          <div className="pulse-dot"></div>
          <span>{interimTranscript || 'Listening for commands (e.g. "Add milk" or "Open cart")...'}</span>
        </div>
      )}

      <div className="mobile-floating-content">
        {/* Cart Quick Access */}
        <button
          onClick={onOpenCart}
          className="mobile-bar-btn"
          title="Open Cart"
        >
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={20} color="#f3b316" />
            {totalItems > 0 && (
              <span className="cart-badge-dot">
                {totalItems}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>Cart</span>
        </button>

        {/* Big Center Microphone Button */}
        <button
          onClick={onToggleListen}
          className={`mobile-bar-mic-btn ${isListening ? 'mic-active' : ''}`}
          title={isListening ? 'Stop Listening' : 'Tap to Speak Command'}
        >
          {isListening ? <MicOff size={26} color="#fff" /> : <Mic size={26} color="#003623" />}
        </button>

        {/* Voice Search Quick Access */}
        <button
          onClick={onOpenSearch}
          className="mobile-bar-btn"
          title="Voice Search Catalog"
        >
          <Search size={20} color="#f3b316" />
          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>Search</span>
        </button>

        {/* Language Quick Switcher */}
        <div className="mobile-bar-btn" style={{ position: 'relative' }}>
          <Globe size={18} color="#f3b316" />
          <select
            value={currentLang}
            onChange={(e) => onLangChange(e.target.value)}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer'
            }}
            title="Switch Language"
          >
            <option value="en-US">English</option>
            <option value="hi-IN">हिन्दी (Hindi)</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
          </select>
          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>
            {currentLang === 'hi-IN' ? 'हिन्दी' : currentLang.split('-')[0].toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
