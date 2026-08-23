import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2, MapPin, CreditCard, Truck, Tag, Sparkles, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function CartModal({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onDeleteItem,
  onClearList,
  triggerAudioAndToast
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');
  const [promoErrorMsg, setPromoErrorMsg] = useState('');

  // Delivery & Payment selection
  const [deliverySpeed, setDeliverySpeed] = useState('express'); // 'express' | 'standard'
  const [deliveryAddress, setDeliveryAddress] = useState('123 Innovation Way, Apt 4B, Tech City');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('sneek_pay'); // 'sneek_pay' | 'card' | 'cod' | 'apple_pay'
  
  // Order Placement state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  const itemsSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = itemsSubtotal > 25 || appliedDiscount > 0 ? 0 : (deliverySpeed === 'express' ? 3.99 : 1.99);
  const taxesAndFees = itemsSubtotal > 0 ? 1.49 : 0;
  const totalDiscount = Math.min(itemsSubtotal, (itemsSubtotal * appliedDiscount));
  const finalTotal = Math.max(0, itemsSubtotal - totalDiscount + deliveryFee + taxesAndFees);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoSuccessMsg('');
    setPromoErrorMsg('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'SNEEK50') {
      setAppliedDiscount(0.5);
      setPromoSuccessMsg('50% OFF Promo applied successfully! 🎉');
      if (triggerAudioAndToast) triggerAudioAndToast('50% discount promo code applied!', 'success');
    } else if (code === 'FREEDEL' || code === 'SNEEK10') {
      setAppliedDiscount(0.1);
      setPromoSuccessMsg('10% OFF + Free Delivery promo applied! 🚀');
      if (triggerAudioAndToast) triggerAudioAndToast('10% discount promo code applied!', 'success');
    } else {
      setPromoErrorMsg('Invalid code. Try "SNEEK50" for 50% discount!');
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const orderId = `SNK-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderId(orderId);
    setOrderPlaced(true);

    const speechMessage = `Order ${orderId} placed successfully! Your express delivery will arrive in 15 minutes.`;
    if (triggerAudioAndToast) {
      triggerAudioAndToast(`Order #${orderId} placed successfully! 🚀`, 'success', speechMessage);
    }
  };

  const handleCloseAndReset = () => {
    if (orderPlaced) {
      onClearList();
      setOrderPlaced(false);
      setAppliedDiscount(0);
      setPromoCode('');
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCloseAndReset}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '28px',
          background: 'rgba(0, 50, 32, 0.96)',
          border: '2px solid var(--accent-yellow)',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--accent-yellow)', padding: '10px', borderRadius: '50%', color: '#003623' }}>
              <ShoppingBag size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                MY <span style={{ color: 'var(--accent-yellow)' }}>CART & CHECKOUT</span>
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-cream)' }}>
                {orderPlaced ? 'Order Confirmation' : `${items.length} unique items in your list`}
              </span>
            </div>
          </div>
          <button
            onClick={handleCloseAndReset}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Success View */}
        {orderPlaced ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(243, 179, 22, 0.2)', border: '3px solid var(--accent-yellow)', marginBottom: '16px' }}>
              <CheckCircle2 size={48} color="#f3b316" />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '6px', fontWeight: 800 }}>
              ORDER CONFIRMED! 🎉
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--accent-yellow)', fontWeight: 700, marginBottom: '20px' }}>
              Order ID: #{placedOrderId}
            </p>

            {/* Live Progress Tracker */}
            <div style={{ background: 'rgba(0, 36, 23, 0.8)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#f3b316" /> Estimated Delivery: <span style={{ color: 'var(--accent-yellow)' }}>15 - 20 minutes</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>1</div>
                  <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Order Received & Paid (${finalTotal.toFixed(2)})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f3b316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003623', fontSize: '0.8rem', fontWeight: 700 }}>2</div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-yellow)', fontWeight: 600 }}>Packing Fresh Marketplace Items 🥑</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>3</div>
                  <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Out for Express Rider Delivery 🛵</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(243, 179, 22, 0.1)', padding: '14px', borderRadius: '12px', border: '1px dashed var(--accent-yellow)', marginBottom: '24px', fontSize: '0.88rem', color: '#fff' }}>
              📍 Delivering to: <strong>{deliveryAddress}</strong>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="btn btn-yellow"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              Back to Marketplace <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div>
            {/* Empty Cart State */}
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                <ShoppingBag size={56} color="#f3b316" style={{ marginBottom: '16px', opacity: 0.7 }} />
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>Your Shopping Cart is Empty</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-cream)', marginBottom: '20px' }}>
                  Explore our marketplace or use voice commands like <em>"Add 2 apples"</em> to build your cart!
                </p>
                <button onClick={onClose} className="btn btn-yellow" style={{ padding: '10px 24px' }}>
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div>
                {/* Cart Items List */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>Items in Order</h3>
                    <button onClick={onClearList} style={{ background: 'none', border: 'none', color: '#f43f5e', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                      Clear All
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '8px',
                          padding: '10px 12px',
                          background: 'rgba(0, 36, 23, 0.7)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: '140px' }}>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-cream)' }}>
                            ${(item.price || 2.99).toFixed(2)} / {item.unit || 'item'}
                          </div>
                        </div>

                        {/* Quantity & Delete */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '2px 4px' }}>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 4px' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '16px', textAlign: 'center', color: '#fff' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 4px' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-yellow)', minWidth: '45px', textAlign: 'right' }}>
                            ${((item.price || 2.99) * item.quantity).toFixed(2)}
                          </div>

                          <button
                            onClick={() => onDeleteItem(item.id)}
                            style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Options */}
                <div style={{ background: 'rgba(0, 36, 23, 0.5)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                      <MapPin size={16} color="#f3b316" /> Delivery Address
                    </div>
                    <button
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-yellow)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      {isEditingAddress ? 'Save' : 'Change'}
                    </button>
                  </div>

                  {isEditingAddress ? (
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid var(--accent-yellow)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.85rem'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-cream)' }}>{deliveryAddress}</div>
                  )}

                  {/* Delivery Speed Toggle */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                    <div
                      onClick={() => setDeliverySpeed('express')}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: deliverySpeed === 'express' ? '2px solid var(--accent-yellow)' : '1px solid rgba(255,255,255,0.1)',
                        background: deliverySpeed === 'express' ? 'rgba(243, 179, 22, 0.15)' : 'rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Truck size={14} color="#f3b316" /> Express 15-Min ($3.99)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-cream)' }}>Fastest grocery rider</div>
                    </div>

                    <div
                      onClick={() => setDeliverySpeed('standard')}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: deliverySpeed === 'standard' ? '2px solid var(--accent-yellow)' : '1px solid rgba(255,255,255,0.1)',
                        background: deliverySpeed === 'standard' ? 'rgba(243, 179, 22, 0.15)' : 'rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="#f3b316" /> Standard 30-Min ($1.99)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-cream)' }}>Flexible delivery window</div>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Tag size={14} color="#f3b316" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. SNEEK50)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 34px',
                          background: 'rgba(0, 36, 23, 0.8)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.82rem' }}>
                      Apply
                    </button>
                  </div>
                  {promoSuccessMsg && <div style={{ fontSize: '0.78rem', color: '#34d399', marginTop: '6px', fontWeight: 600 }}>{promoSuccessMsg}</div>}
                  {promoErrorMsg && <div style={{ fontSize: '0.78rem', color: '#f43f5e', marginTop: '6px', fontWeight: 600 }}>{promoErrorMsg}</div>}
                </form>

                {/* Payment Selection */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    Payment Method
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { id: 'sneek_pay', label: '⚡ Sneek Pay' },
                      { id: 'card', label: '💳 Credit/Debit' },
                      { id: 'cod', label: '💵 Cash on Delivery' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '10px',
                          border: paymentMethod === method.id ? '2px solid var(--accent-yellow)' : '1px solid rgba(255,255,255,0.1)',
                          background: paymentMethod === method.id ? 'var(--accent-yellow)' : 'rgba(0,0,0,0.3)',
                          color: paymentMethod === method.id ? '#003623' : '#fff',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-cream)', marginBottom: '6px' }}>
                    <span>Items Subtotal</span>
                    <span>${itemsSubtotal.toFixed(2)}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#34d399', marginBottom: '6px', fontWeight: 600 }}>
                      <span>Promo Discount</span>
                      <span>-${totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-cream)', marginBottom: '6px' }}>
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <strong style={{ color: '#34d399' }}>FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-cream)', marginBottom: '8px' }}>
                    <span>Taxes & Service Fee</span>
                    <span>${taxesAndFees.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', color: '#fff', fontWeight: 800, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '10px' }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="btn btn-yellow"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
                >
                  <ShieldCheck size={20} /> Place Order • ${finalTotal.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
