import React, { useState } from 'react';
import { Plus, Star, Clock, Sparkles } from 'lucide-react';
import { MOCK_CATALOG, CATEGORIES } from '../data/mockCatalog';

export default function ProductGrid({ onAddProduct }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? MOCK_CATALOG
    : MOCK_CATALOG.filter(p => p.category === activeCategory);

  const getEmojiForProduct = (name) => {
    const n = name.toLowerCase();
    if (n.includes('milk')) return '🥛';
    if (n.includes('apple')) return '🍎';
    if (n.includes('banana')) return '🍌';
    if (n.includes('bread')) return '🍞';
    if (n.includes('strawberry') || n.includes('berries')) return '🍓';
    if (n.includes('avocado')) return '🥑';
    if (n.includes('yogurt')) return '🥣';
    if (n.includes('water')) return '🥤';
    if (n.includes('toothpaste')) return '🪥';
    if (n.includes('chocolate')) return '🍫';
    if (n.includes('oil')) return '🫒';
    if (n.includes('corn')) return '🌽';
    if (n.includes('pumpkin')) return '🎃';
    return '🍟';
  };

  return (
    <section
      id="product-section"
      style={{
        background: 'var(--bg-emerald-dark)',
        borderRadius: '32px',
        padding: '40px 32px',
        marginBottom: '40px',
        border: '1.5px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0, 44, 29, 0.6)'
      }}
    >
      {/* Section Header from Reference Image */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          DISCOVER YOUR <span style={{ color: 'var(--accent-yellow)' }}>FAVORITE FLAVORS</span>
        </h2>
        <p style={{ fontSize: '0.98rem', color: 'var(--text-cream)', lineHeight: 1.5 }}>
          Try some exotic flavors or delicious healthy toppings. We've collected the finest fresh farm produce and grocery items for your voice shopping!
        </p>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: activeCategory === cat ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.12)',
                color: activeCategory === cat ? 'var(--text-dark)' : '#ffffff',
                boxShadow: activeCategory === cat ? '0 4px 16px rgba(243, 179, 22, 0.4)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Package Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '28px'
        }}
      >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              background: 'rgba(0, 68, 45, 0.8)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="glass-panel-hover"
          >
            {/* Circular Yellow Disc Backdrop behind product emoji/icon from Reference Image */}
            <div style={{ position: 'relative', margin: '10px 0 16px' }}>
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'var(--accent-yellow)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                  boxShadow: '0 8px 24px rgba(243, 179, 22, 0.3)'
                }}
              />
              <div
                style={{
                  fontSize: '3.6rem',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
                }}
              >
                {getEmojiForProduct(product.name)}
              </div>
            </div>

            {/* Product Title & Brand */}
            <div style={{ width: '100%', marginBottom: '16px' }}>
              <span className={`tag-badge ${product.category === 'Produce' ? 'badge-produce' : 'badge-yellow'}`} style={{ marginBottom: '8px' }}>
                {product.category}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '4px 0 2px' }}>
                {product.name}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-cream)' }}>
                {product.brand} • {product.unit}
              </div>
            </div>

            {/* Price & Yellow Add Button */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-cream)', textTransform: 'uppercase' }}>Price</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-yellow)', fontFamily: 'var(--font-display)' }}>
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <button
                className="btn btn-yellow"
                onClick={() => onAddProduct(product.name, product.category, product.price, product.unit)}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
