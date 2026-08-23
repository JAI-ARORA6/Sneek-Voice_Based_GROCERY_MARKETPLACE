import React, { useState } from 'react';
import { Sparkles, Clock, Sun, RefreshCw, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import {
  getHistoryBasedRecommendations,
  getSeasonalRecommendations,
  getSubstitutesForItem
} from '../services/recommendationEngine';

export default function SmartSuggestions({ shoppingList, onAddSuggestion }) {
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'seasonal' | 'substitutes'

  const historyRecs = getHistoryBasedRecommendations(shoppingList);
  const seasonalRecs = getSeasonalRecommendations(shoppingList);

  // Derive substitutes for items currently in shopping list
  const currentItemNames = shoppingList.map(item => item.name);
  const allSubstitutes = currentItemNames.flatMap(name => getSubstitutesForItem(name));

  return (
    <div className="glass-panel" style={{ padding: '24px', flex: '0 0 360px', width: '100%', maxWidth: '420px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Sparkles size={20} color="#fbbf24" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
          Smart AI Suggestions
        </h3>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--border-glass)' }}>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'history' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
            color: activeTab === 'history' ? '#fff' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Clock size={13} /> Restock
        </button>
        <button
          onClick={() => setActiveTab('seasonal')}
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'seasonal' ? 'rgba(6, 182, 212, 0.3)' : 'transparent',
            color: activeTab === 'seasonal' ? '#fff' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Sun size={13} /> Seasonal
        </button>
        <button
          onClick={() => setActiveTab('substitutes')}
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: activeTab === 'substitutes' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
            color: activeTab === 'substitutes' ? '#fff' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <RefreshCw size={13} /> Swaps
        </button>
      </div>

      {/* Tab Content: History Restock */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {historyRecs.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>
              All frequent staples are already in your list!
            </p>
          ) : (
            historyRecs.map(item => (
              <div
                key={item.id}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '2px' }}>
                    ⚠️ {item.reason}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '2px' }}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => onAddSuggestion(item.name, item.category, item.price, item.unit)}
                  style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Seasonal */}
      {activeTab === 'seasonal' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {seasonalRecs.map(item => (
            <div
              key={item.id}
              style={{
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-glass)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>{item.name}</span>
                  {item.organic && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '1px 5px', borderRadius: '4px' }}>
                      Organic
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '2px' }}>
                  🌟 {item.reason}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '2px' }}>
                  ${item.price.toFixed(2)} / {item.unit}
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => onAddSuggestion(item.name, item.category, item.price, item.unit)}
                style={{ padding: '6px 10px', fontSize: '0.78rem' }}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Substitutes */}
      {activeTab === 'substitutes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {allSubstitutes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '16px 0', color: '#94a3b8', fontSize: '0.85rem' }}>
              Add items like <strong>Whole Milk</strong> or <strong>White Bread</strong> to see healthy substitute recommendations!
            </div>
          ) : (
            allSubstitutes.map((sub, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Swap for <em>"{sub.original}"</em>:
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399', marginTop: '2px' }}>
                    {sub.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
                    💡 {sub.reason}
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => onAddSuggestion(sub.name, sub.category, sub.price, 'carton')}
                  style={{ padding: '6px 10px', fontSize: '0.78rem', borderColor: '#10b981', color: '#34d399' }}
                >
                  <Plus size={14} /> Swap
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
