import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UtensilsCrossed } from "lucide-react";

export default function Navbar({ cartCount, onCart }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon"><UtensilsCrossed size={20} /></span>
          <span>Bite<span>&</span>Brew</span>
        </Link>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/explore">Explore Menu</NavLink>
        </nav>
        <button className={`cart-btn ${cartCount > 0 ? "has-items" : ""}`} onClick={onCart} aria-label="Open cart">
          <ShoppingBag size={20} />
          <span>Cart</span>
          {cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </div>
    </header>
  );
}