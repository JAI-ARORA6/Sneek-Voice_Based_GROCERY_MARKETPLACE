import React, { useState, useEffect } from 'react';
import { Search, Mic, X, Filter, Plus, DollarSign, Tag, Star, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_CATALOG } from '../data/mockCatalog';
import { extractPriceBounds, correctSpeechTypos } from '../services/nlpEngine';

export default function VoiceSearchModal({
  isOpen,
  onClose,
  initialQuery = '',
  initialMaxPrice = 20,
  initialMinPrice = 0,
  initialCategory = null,
  initialOrganicOnly = false,
  onAddToList,
  isListening,
  onStartVoiceSearch
}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [minPrice, setMinPrice] = useState(initialMinPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || 20);
  const [organicOnly, setOrganicOnly] = useState(initialOrganicOnly);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');

  useEffect(() => {
    setSearchQuery(initialQuery);
    setOrganicOnly(initialOrganicOnly);
    setSelectedCategory(initialCategory || 'All');
    
    // Parse query string for price bounds in real-time
    const text = correctSpeechTypos(initialQuery || '');
    const bounds = extractPriceBounds(text);
    if (bounds.minPrice > 0 || bounds.maxPrice < 20) {
      setMinPrice(bounds.minPrice);
      setMaxPrice(bounds.maxPrice);
    } else {
      setMinPrice(initialMinPrice || 0);
      setMaxPrice(initialMaxPrice || 20);
    }
  }, [initialQuery, initialMaxPrice, initialMinPrice, initialCategory, initialOrganicOnly, isOpen]);

  // Handle typing or editing in the search input box
  const handleInputChange = (textValue) => {
    setSearchQuery(textValue);
    const corrected = correctSpeechTypos(textValue);
    const bounds = extractPriceBounds(corrected);
    if (bounds.minPrice > 0 || bounds.maxPrice < 20) {
      setMinPrice(bounds.minPrice);
      setMaxPrice(bounds.maxPrice);
    }
  };

  const handleClearSearchInput = () => {
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(20);
    setSelectedCategory('All');
  };

  if (!isOpen) return null;

  // Generic Wildcard Keywords (match all products within price range)
  const isWildcardQuery = (str) => {
    if (!str) return true;
    const q = str.toLowerCase().trim();
    if (q === '' || q === 'all' || q === 'all products' || q === 'all the products' || q === 'products' || q === 'product' || q === 'items' || q === 'item' || q === 'anything' || q === 'everything' || q === 'food' || q === 'stuff' || q.includes('in list')) {
      return true;
    }
    const words = q.split(/\s+/);
    const genericWords = ['all', 'the', 'products', 'product', 'items', 'item', 'food', 'stuff', 'anything', 'everything', 'show', 'me', 'find', 'get', 'in', 'list', 'that', 'are', 'is', 'above', 'under', 'below', 'over', 'dollar', 'dollars', 'doloor', 'doloors', 'bucks', 'than', 'between', '5', '3', '2', '6', '7', '8', '10', 'beverages', 'produce', 'dairy', 'bakery', 'snacks', 'pantry', 'section', 'category'];
    return words.every(w => genericWords.includes(w));
  };

  // Filter Catalog
  const filteredCatalog = MOCK_CATALOG.filter(item => {
    const q = (searchQuery || '').toLowerCase().trim();
    const isWildcard = isWildcardQuery(q);

    const matchesQuery = isWildcard ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(tag => tag.includes(q) || q.includes(tag)));

    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
    const matchesOrganic = !organicOnly || item.organic;
    const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand;

    return matchesQuery && matchesCategory && matchesPrice && matchesOrganic && matchesBrand;
  });

  const brands = ['All', ...new Set(MOCK_CATALOG.map(i => i.brand))];
  const categories = ['All', 'Produce', 'Dairy & Eggs', 'Bakery', 'Beverages', 'Snacks', 'Pantry', 'Personal Care'];

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          background: 'rgba(0, 54, 35, 0.96)',
          border: '2px solid var(--accent-yellow)',
          borderRadius: '32px',
          boxShadow: '0 25px 60px rgba(0, 44, 29, 0.8)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 44, 29, 0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003623' }}>
              <Search size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#fff', fontFamily: 'var(--font-display)' }}>
                VOICE CATALOG <span style={{ color: 'var(--accent-yellow)' }}>SEARCH</span>
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-cream)' }}>
                Showing <strong>{filteredCatalog.length} products</strong> {
                  minPrice > 0 && maxPrice < 20
                    ? `between $${minPrice.toFixed(2)} and $${maxPrice.toFixed(2)}`
                    : minPrice > 0
                    ? `above $${minPrice.toFixed(2)}`
                    : `under $${maxPrice.toFixed(2)}`
                }
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Voice & Typed Search Input & Controls Bar */}
        <div style={{ padding: '20px 28px', background: 'rgba(0, 44, 29, 0.4)' }}>
          {/* Input Box with Edit, Clear, and Search Button */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}
          >
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Search size={18} color="#f3b316" style={{ position: 'absolute', left: '16px' }} />
              <input
                type="text"
                placeholder="Type or speak e.g. 'above 5 but less than 6 dollars' or 'beverages'..."
                value={searchQuery === 'all' ? '' : searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 88px 14px 48px',
                  background: 'rgba(0, 44, 29, 0.8)',
                  border: '1.5px solid var(--accent-yellow)',
                  borderRadius: '9999px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
              {/* Clear (X) button inside text box */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearchInput}
                  style={{
                    position: 'absolute',
                    right: '48px',
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                  title="Clear text"
                >
                  <X size={14} />
                </button>
              )}

              {/* Mic Icon */}
              <button
                type="button"
                onClick={onStartVoiceSearch}
                className={isListening ? 'mic-active' : ''}
                style={{
                  position: 'absolute',
                  right: '8px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isListening ? '#f43f5e' : 'var(--accent-yellow)',
                  color: 'var(--text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Speak Voice Search"
              >
                <Mic size={16} />
              </button>
            </div>

            {/* Explicit Search Button for Typed Text */}
            <button
              type="submit"
              className="btn btn-yellow"
              style={{ padding: '12px 20px', borderRadius: '9999px', fontSize: '0.88rem' }}
            >
              Search
            </button>
          </form>

          {/* Category Filter Shortcuts */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '4px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCategory === cat ? 'var(--text-dark)' : '#ffffff'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range & Brand Filters Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', fontSize: '0.88rem', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
              <DollarSign size={18} color="#f3b316" />
              <span style={{ fontFamily: 'var(--font-display)' }}>
                {minPrice > 0 && maxPrice < 20 ? (
                  <span>Range: <strong style={{ color: 'var(--accent-yellow)', fontSize: '0.95rem' }}>${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}</strong></span>
                ) : minPrice > 0 ? (
                  <span>Min Price: <strong style={{ color: 'var(--accent-yellow)', fontSize: '0.95rem' }}>${minPrice.toFixed(2)}</strong></span>
                ) : (
                  <span>Max Price: <strong style={{ color: 'var(--accent-yellow)', fontSize: '0.95rem' }}>${maxPrice.toFixed(2)}</strong></span>
                )}
              </span>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={minPrice > 0 ? minPrice : maxPrice}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (minPrice > 0) setMinPrice(val);
                  else setMaxPrice(val);
                }}
                style={{ flex: 1, accentColor: '#f3b316', cursor: 'pointer' }}
              />
            </div>

            {/* Organic Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                style={{ accentColor: '#f3b316', width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Organic Only</span>
            </label>
          </div>
        </div>

        {/* Product Cards Grid inside Modal */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {filteredCatalog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-cream)' }}>
              <Search size={48} color="#f3b316" style={{ marginBottom: '12px', opacity: 0.5 }} />
              <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: '4px' }}>
                No products found matching your price range
              </h4>
              <p style={{ fontSize: '0.9rem' }}>Try adjusting your price bounds or category filters.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '20px'
              }}
            >
              {filteredCatalog.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: 'rgba(0, 44, 29, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                  className="glass-panel-hover"
                >
                  {/* Yellow Disc Backdrop behind Food Emoji */}
                  <div style={{ position: 'relative', margin: '8px 0 14px' }}>
                    <div
                      style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '50%',
                        background: 'var(--accent-yellow)',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        boxShadow: '0 6px 18px rgba(243, 179, 22, 0.3)'
                      }}
                    />
                    <div
                      style={{
                        fontSize: '3rem',
                        position: 'relative',
                        zIndex: 2,
                        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))'
                      }}
                    >
                      {getEmojiForProduct(product.name)}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '6px' }}>
                      <span className="tag-badge badge-yellow" style={{ fontSize: '0.7rem' }}>
                        {product.category}
                      </span>
                      {product.organic && (
                        <span style={{ fontSize: '0.7rem', color: '#fff', background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                          Organic
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', margin: '2px 0' }}>
                      {product.name}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-cream)' }}>
                      {product.brand} • {product.unit}
                    </div>
                  </div>

                  {/* Price & Add Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-cream)' }}>Price</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-yellow)', fontFamily: 'var(--font-display)' }}>
                        ${product.price.toFixed(2)}
                      </div>
                    </div>

                    <button
                      className="btn btn-yellow"
                      onClick={() => {
                        onAddToList(product.name, product.category, product.price, product.unit);
                        onClose();
                      }}
                      style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
