import React from 'react';
import { Mic, MicOff, ShoppingBag, Search, HelpCircle, Volume2 } from 'lucide-react';

export default function FloatingVoiceController({
  isListening,
  onToggleListen,
  totalItems,
  totalCost,
  onOpenCart,
  onOpenSearch,
  onOpenHelp,
  interimTranscript
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

        {/* Voice Commands Help */}
        <button
          onClick={onOpenHelp}
          className="mobile-bar-btn"
          title="Voice Command Help"
        >
          <HelpCircle size={20} color="#f3b316" />
          <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>Help</span>
        </button>
      </div>
    </div>
  );
}
