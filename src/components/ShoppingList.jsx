import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, Minus, Trash2, Tag, Mic, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/mockCatalog';

export default function ShoppingList({
  items,
  onToggleComplete,
  onUpdateQuantity,
  onDeleteItem,
  onClearList,
  onAddSampleItem
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const totalCost = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const completedCount = items.filter(item => item.completed).length;

  const getCategoryBadgeStyle = (category) => {
    switch (category) {
      case 'Dairy & Eggs': return 'badge-dairy';
      case 'Produce': return 'badge-produce';
      case 'Bakery': return 'badge-bakery';
      case 'Beverages': return 'badge-beverages';
      case 'Pantry': return 'badge-pantry';
      case 'Snacks': return 'badge-snacks';
      default: return 'badge-default';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingBag size={22} color="#6366f1" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Your Shopping List <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 400 }}>({completedCount}/{items.length} completed)</span>
          </h2>
        </div>

        {items.length > 0 && (
          <button
            onClick={onClearList}
            className="btn btn-danger"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Trash2 size={14} /> Clear List
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: selectedCategory === cat ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === cat ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shopping List Items Container */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <ShoppingBag size={48} color="#475569" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '6px' }}>No items in this view</h3>
          <p style={{ fontSize: '0.88rem', marginBottom: '16px' }}>Use your voice or tap suggestions below to add items to your shopping list.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => onAddSampleItem('Organic Honeycrisp Apples', 'Produce')}>
              + Add Apples
            </button>
            <button className="btn btn-secondary" onClick={() => onAddSampleItem('Whole Milk', 'Dairy & Eggs')}>
              + Add Milk
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: item.completed ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.04)',
                border: item.completed ? '1px solid rgba(255,255,255,0.05)' : '1px solid var(--border-glass)',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                opacity: item.completed ? 0.65 : 1
              }}
            >
              {/* Checkbox & Item Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <button
                  onClick={() => onToggleComplete(item.id)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: item.completed ? 'none' : '2px solid #64748b',
                    background: item.completed ? '#10b981' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.completed && <Check size={16} />}
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: item.completed ? '#94a3b8' : '#f8fafc',
                        textDecoration: item.completed ? 'line-through' : 'none'
                      }}
                    >
                      {item.name}
                    </span>

                    <span className={`tag-badge ${getCategoryBadgeStyle(item.category)}`}>
                      {item.category}
                    </span>

                    {item.addedVia === 'voice' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '0.7rem', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        <Mic size={10} /> Voice
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                    ${(item.price || 2.99).toFixed(2)} / {item.unit || 'item'}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-glass)', padding: '2px' }}>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px 8px' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, padding: '0 8px', minWidth: '24px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px 8px' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', minWidth: '60px', textAlign: 'right' }}>
                  ${((item.price || 2.99) * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px' }}
                  title="Remove Item"
                >
                  <Trash2 size={16} className="hover-red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Total Summary */}
      {items.length > 0 && (
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Estimated Total Cart Price
          </span>
          <strong style={{ fontSize: '1.25rem', color: '#34d399' }}>
            ${totalCost.toFixed(2)}
          </strong>
        </div>
      )}
    </div>
  );
}
