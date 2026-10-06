import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/food";

export default function Home({ foods, onAdd }) {
  const best = foods.filter((f) => f.tag === "Bestseller").slice(0, 4);

  const heroSlides = useMemo(() => {
    const order = ["tea", "burgers", "coffee", "sandwiches", "pizza"];
    const fallback = {
      tea: { name: "Masala Chai", rating: 4.9, tag: "Warm favourite", emoji: "🍵" },
      burgers: { name: "Cheese Burger", rating: 4.9, tag: "Loaded & juicy", emoji: "🍔" },
      coffee: { name: "Cappuccino", rating: 4.9, tag: "Freshly brewed", emoji: "☕" },
      sandwiches: { name: "Paneer Tikka Sandwich", rating: 4.9, tag: "Toasted favourite", emoji: "🥪" },
      pizza: { name: "Farmhouse Pizza", rating: 4.9, tag: "Customer favourite", emoji: "🍕" },
    };

    return order.map((category) => {
      const item = foods.find((food) => food.category === category);
      return item ? { ...fallback[category], ...item } : fallback[category];
    });
  }, [foods]);

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const heroFood = heroSlides[heroIndex];

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="pill"><Sparkles size={15} /> Freshly made, happily served</span>
          <h1>Good food.<br /><em>Good mood.</em></h1>
          <p>Scan. Explore. Choose your favourites. A simple digital menu made for a delicious experience.</p>
          <div className="hero-actions">
            <Link to="/explore" className="primary-btn">Explore Menu <ArrowRight size={18} /></Link>
            <a href="#popular" className="text-btn">See bestsellers</a>
          </div>
          <div className="trust-row">
            <span><Clock3 size={17} /> Quick service</span>
            <span><ShieldCheck size={17} /> Fresh ingredients</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card main-food hero-slideshow" key={heroFood.id || heroIndex}>
            <img src={heroFood.image} alt={heroFood.name} />
            <div className="hero-slide-shade" />
            <div className="floating-label">
              <span>★ {heroFood.rating}</span>
              <strong>{heroFood.name}</strong>
              <small>{heroFood.tag}</small>
            </div>
            <div className="hero-category-pill">{heroFood.emoji} {heroFood.category}</div>
          </div>
          <div className="mini-note">{heroFood.emoji}<span>Made with<br />love</span></div>
          <div className="hero-dots" aria-label="Featured food categories">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.category}
                className={index === heroIndex ? "active" : ""}
                aria-label={`Show ${slide.category}`}
                onClick={() => setHeroIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div><MapPin size={21} /><span><b>Easy to explore</b><small>Everything in one menu</small></span></div>
        <div><Clock3 size={21} /><span><b>Simple ordering</b><small>Add your favourites to cart</small></span></div>
        <div><Sparkles size={21} /><span><b>Made for foodies</b><small>Fresh choices for every mood</small></span></div>
      </section>

      <section className="section" id="popular">
        <div className="section-head">
          <div><span className="eyebrow">CUSTOMER FAVOURITES</span><h2>Best sellers</h2></div>
          <Link to="/explore" className="view-link">View all <ArrowRight size={17} /></Link>
        </div>
        <div className="food-grid">{best.map((food) => <FoodCard key={food.id} food={food} onAdd={onAdd} />)}</div>
      </section>

      <section className="section categories-section">
        <div className="section-head">
          <div><span className="eyebrow">EXPLORE BY CATEGORY</span><h2>What are you craving?</h2></div>
        </div>
        <div className="category-grid">
          {categories.map((cat) => <CategoryCard key={cat.id} category={cat} count={foods.filter(f => f.category === cat.id).length} />)}
        </div>
      </section>

      <section className="qr-section">
        <div>
          <span className="eyebrow">YOUR DIGITAL MENU</span>
          <h2>One scan.<br />A whole menu.</h2>
          <p>Put your website behind a QR code on every table. Guests can open the menu instantly on their phone and explore without waiting for a physical menu.</p>
          <Link to="/explore" className="primary-btn">Open Digital Menu <ArrowRight size={18} /></Link>
        </div>
        <div className="fake-qr">
          <div className="qr-grid">{Array.from({length: 81}).map((_, i) => <i key={i} className={(i * 7 + 3) % 5 < 2 ? "on" : ""}></i>)}</div>
          <b>SCAN TO EXPLORE</b>
        </div>
      </section>

      <footer className="footer">
        <div><div className="brand footer-brand">Bite<span>&</span>Brew</div><p>A simple frontend-only digital food menu.</p></div>
        <div><b>Menu</b><Link to="/explore">Explore</Link><Link to="/category/tea">Tea</Link><Link to="/category/coffee">Coffee</Link></div>
        <div><b>More</b><a href="#popular">Best sellers</a><a href="#popular">About</a></div>
      </footer>
    </>
  );
}