import React, { useState } from "react";
import { Eye, Plus, Star, X } from "lucide-react";

export default function FoodCard({ food, onAdd }) {
  const [quickView, setQuickView] = useState(false);

  return (
    <>
      <article className="food-card reveal-card">
        <div className="food-image-wrap" onClick={() => setQuickView(true)} role="button" tabIndex="0" onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setQuickView(true)}>
          <img src={food.image} alt={food.name} loading="lazy" />
          <span className="food-tag">{food.tag}</span>
          <span className="quick-view"><Eye size={15} /> Quick view</span>
        </div>
        <div className="food-info">
          <div className="food-title-row"><h3>{food.name}</h3><span className="rating"><Star size={14} fill="currentColor" /> {food.rating}</span></div>
          <p>{food.description}</p>
          <div className="food-bottom"><strong>₹{food.price}</strong><button className="add-btn" onClick={() => onAdd(food)}><Plus size={17} /> Add</button></div>
        </div>
      </article>

      {quickView && <div className="quick-modal" role="dialog" aria-modal="true" onClick={() => setQuickView(false)}>
        <div className="quick-dialog" onClick={(e) => e.stopPropagation()}>
          <button className="quick-close" onClick={() => setQuickView(false)} aria-label="Close"><X size={20} /></button>
          <img src={food.image} alt={food.name} />
          <div className="quick-content">
            <span className="food-tag static-tag">{food.tag}</span>
            <h2>{food.name}</h2>
            <div className="quick-meta"><span>★ {food.rating}</span><span>Freshly prepared</span></div>
            <p>{food.description}</p>
            <div className="quick-bottom"><strong>₹{food.price}</strong><button className="primary-btn" onClick={() => { onAdd(food); setQuickView(false); }}>Add to cart <Plus size={17} /></button></div>
          </div>
        </div>
      </div>}
    </>
  );
}
