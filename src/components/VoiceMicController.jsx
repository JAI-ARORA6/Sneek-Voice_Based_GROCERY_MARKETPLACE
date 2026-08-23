import React from 'react';
import { Mic, MicOff, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import AudioWaveform from './AudioWaveform';

export default function VoiceMicController({
  isListening,
  onToggleListen,
  transcript,
  interimTranscript,
  onRunSampleCommand,
  hasSpeechSupport
}) {
  const exampleCommands = [
    'find me fruits under 3 doloor',
    'add 5 quantity of strawberries',
    'remove 5 milk from it',
    'Find toothpaste under $5',
    'Add 2 bottles of whole milk'
  ];

  return (
    <div
      className="glass-panel"
      style={{
        padding: '28px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(0, 54, 35, 0.85)',
        borderColor: 'var(--border-yellow)'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-display)', color: '#fff' }}>
          {isListening ? (
            <span style={{ color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f43f5e' }} />
              Listening... Speak your command
            </span>
          ) : (
            <span>Tap Microphone to Start Voice Command</span>
          )}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-cream)', maxWidth: '480px', margin: '0 auto 16px' }}>
          Add or remove items, adjust quantities, or query prices using natural speech.
        </p>

        {/* Main Microphone Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <button
            onClick={onToggleListen}
            className={isListening ? 'mic-active' : ''}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: isListening
                ? 'linear-gradient(135deg, #f43f5e, #e11d48)'
                : 'var(--accent-yellow)',
              border: 'none',
              color: 'var(--text-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-mic)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isListening ? 'scale(1.05)' : 'scale(1)'
            }}
            title={isListening ? 'Stop Listening' : 'Start Voice Command'}
          >
            {isListening ? <MicOff size={34} color="#fff" /> : <Mic size={34} color="#003623" />}
          </button>
        </div>

        {/* Live Audio Visualizer */}
        <AudioWaveform isListening={isListening} />

        {/* Live Recognized Speech Transcript Box */}
        {(transcript || interimTranscript || isListening) && (
          <div
            style={{
              background: 'rgba(0, 44, 29, 0.9)',
              border: '1px solid var(--accent-yellow)',
              borderRadius: '14px',
              padding: '10px 16px',
              margin: '14px auto',
              maxWidth: '540px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Volume2 size={18} color="#f3b316" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: transcript ? '#ffffff' : '#a3e2cb' }}>
              {transcript || interimTranscript || 'Say something like "Add 2 bottles of milk"...'}
            </span>
          </div>
        )}

        {/* Browser Speech Warning if restricted */}
        {!hasSpeechSupport && (
          <div style={{ background: 'rgba(244, 63, 94, 0.2)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '10px', padding: '8px 14px', maxWidth: '540px', margin: '12px auto', color: '#fda4af', fontSize: '0.8rem' }}>
            <strong>Note:</strong> Web Speech API restricted in this tab. Click sample commands below or use text input to test NLP!
          </div>
        )}

        {/* Quick Example Voice Command Chips */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: '#ffe699', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'var(--font-display)' }}>
            <Sparkles size={14} color="#f3b316" /> Try Spoken Voice Examples (1-Click Test)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {exampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => onRunSampleCommand(cmd)}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-yellow)';
                  e.currentTarget.style.color = '#003623';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <span>"{cmd}"</span>
                <ArrowRight size={12} color="#f3b316" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
