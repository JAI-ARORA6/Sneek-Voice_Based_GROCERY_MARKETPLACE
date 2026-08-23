import React from 'react';
import { Sparkles, Mic, Search, Star, Clock, ShoppingBag, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import VoiceMicController from './VoiceMicController';

export default function HeroBanner({
  isListening,
  onToggleListen,
  transcript,
  interimTranscript,
  onRunSampleCommand,
  hasSpeechSupport,
  onOpenSearch,
  currentLang = 'en-US'
}) {
  return (
    <section style={{ marginBottom: '40px' }}>
      {/* Hero Section Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          padding: '20px 0 40px'
        }}
      >
        {/* Left Column: Chunky Sneek Headline & Pill Buttons */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(243, 179, 22, 0.2)',
              border: '1px solid var(--accent-yellow)',
              color: 'var(--accent-yellow)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '20px',
              fontFamily: 'var(--font-display)'
            }}
          >
            <Sparkles size={15} color="#f3b316" />
            <span>AI Voice Powered Grocery Marketplace</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: '20px',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase'
            }}
          >
            SNACK WITH <br />
            <span style={{ color: 'var(--accent-yellow)' }}>NO LIMITS</span>
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-cream)',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '500px'
            }}
          >
            When you're on the go and don't have time to cook, fresh snacks & groceries are the perfect solution. Order instantly by speaking natural voice commands.
          </p>

          {/* Action Buttons from Reference Image */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button onClick={onToggleListen} className="btn btn-yellow" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
              <Mic size={20} /> Snacking Now (Voice)
            </button>
            <button onClick={onOpenSearch} className="btn btn-outline-yellow" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
              Explore Catalog
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual with Circular Yellow Backdrop Disc & Floating Snack Pack */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Circular Yellow Disc Backdrop from Reference Image */}
          <div
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'var(--accent-yellow)',
              boxShadow: '0 0 50px rgba(243, 179, 22, 0.4)',
              zIndex: 1
            }}
          />

          {/* Foreground Hero Mic Controller overlaying circular disc */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '480px' }}>
            <VoiceMicController
              isListening={isListening}
              onToggleListen={onToggleListen}
              transcript={transcript}
              interimTranscript={interimTranscript}
              onRunSampleCommand={onRunSampleCommand}
              hasSpeechSupport={hasSpeechSupport}
              currentLang={currentLang}
            />
          </div>
        </div>
      </div>

      {/* Yellow Feature Marquee Strip from Reference Image */}
      <div className="sneek-marquee" style={{ marginTop: '20px' }}>
        <span>🌿 FRESH INGREDIENTS</span>
        <span>⚡ LOW CALORIES</span>
        <span>🎙️ AI VOICE CONTROL</span>
        <span>🍎 100% ORGANIC FARM</span>
        <span>🚀 15 MIN DELIVERY</span>
      </div>
    </section>
  );
}
