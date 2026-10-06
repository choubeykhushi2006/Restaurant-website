import React from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";

export default function Cart({ open, items, onClose, onChangeQty, onRemove }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const service = subtotal ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + service;

  return (
    <div className={`cart-layer ${open ? "show" : ""}`}>
      <div className="cart-backdrop" onClick={onClose}></div>
      <aside className="cart-drawer">
        <div className="cart-head">
          <div>
            <span className="eyebrow">YOUR ORDER</span>
            <h2>Your Cart</h2>
          </div>
          <button className="icon-btn" onClick={onClose}><X /></button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛍️</div>
            <h3>Your cart is empty</h3>
            <p>Add something delicious from the menu.</p>
            <button className="primary-btn" onClick={onClose}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <strong>₹{item.price * item.qty}</strong>
                    <div className="qty">
                      <button onClick={() => onChangeQty(item.id, -1)}><Minus size={14} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => onChangeQty(item.id, 1)}><Plus size={14} /></button>
                      <button className="trash" onClick={() => onRemove(item.id)}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bill">
              <div><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div><span>Service fee</span><span>₹{service}</span></div>
              <div className="total"><span>Total</span><strong>₹{total}</strong></div>
              <button className="checkout-btn" onClick={() => alert("This is a frontend-only demo. Connect a backend/payment system later.")}>Checkout — ₹{total}</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}