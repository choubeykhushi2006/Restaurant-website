import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Category from "./pages/Category";
import { foods } from "./data/food";

function PageMotion({ children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return <div key={location.pathname} className={`page-motion ${visible ? "is-visible" : ""}`}>{children}</div>;
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const addToCart = (food) => {
    setCart((current) => {
      const found = current.find((item) => item.id === food.id);
      if (found) return current.map((item) => item.id === food.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { ...food, qty: 1 }];
    });
    setToast(`${food.name} added to cart`);
    window.clearTimeout(window.__foodToast);
    window.__foodToast = window.setTimeout(() => setToast(null), 2200);
  };

  const changeQty = (id, amount) => setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + amount } : item).filter((item) => item.qty > 0));
  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  useEffect(() => () => window.clearTimeout(window.__foodToast), []);

  return (
    <>
      <Navbar cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main><PageMotion><Routes>
        <Route path="/" element={<Home foods={foods} onAdd={addToCart} />} />
        <Route path="/explore" element={<Explore foods={foods} onAdd={addToCart} />} />
        <Route path="/category/:categoryId" element={<Category foods={foods} onAdd={addToCart} />} />
      </Routes></PageMotion></main>
      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onChangeQty={changeQty} onRemove={removeFromCart} />
      {toast && <div className="toast" role="status"><span className="toast-check">✓</span><span>{toast}</span><button onClick={() => { setToast(null); setCartOpen(true); }}>View cart</button></div>}
    </>
  );
}
