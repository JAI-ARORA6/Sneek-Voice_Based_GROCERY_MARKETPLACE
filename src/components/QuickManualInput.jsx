import React, { useState } from 'react';
import { Send, Terminal, Sparkles } from 'lucide-react';

export default function QuickManualInput({ onSubmitCommand }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSubmitCommand(inputText.trim());
    setInputText('');
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '16px 24px',
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Terminal size={18} color="#6366f1" />
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1' }}>
          Fallback Natural Language Text Console:
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: '280px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder='Type natural commands e.g. "I want to buy 3 apples" or "Remove milk"'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px' }}>
          <Send size={16} /> Process NLP
        </button>
      </form>
    </div>
  );
}
