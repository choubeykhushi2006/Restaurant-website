import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import FoodCard from "../components/FoodCard";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/food";

export default function Explore({ foods, onAdd }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    return foods.filter((food) => {
      const matchesCategory = active === "all" || food.category === active;
      const q = query.toLowerCase().trim();
      const matchesSearch = !q || `${food.name} ${food.description}`.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [foods, query, active]);

  return (
    <div className="explore-page">
      <section className="menu-hero">
        <span className="eyebrow">OUR MENU</span>
        <h1>Find your next<br /><em>favourite bite.</em></h1>
        <p>Browse everything from a comforting cup of chai to a cheesy slice of pizza.</p>
      </section>

      <section className="menu-tools">
        <div className="search-box"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search food..." /></div>
        <div className="filter-title"><SlidersHorizontal size={17} /> Categories</div>
        <div className="chips">
          <button className={active === "all" ? "active" : ""} onClick={() => setActive("all")}>All</button>
          {categories.map((cat) => <button key={cat.id} className={active === cat.id ? "active" : ""} onClick={() => setActive(cat.id)}>{cat.emoji} {cat.name}</button>)}
        </div>
      </section>

      <section className="section menu-results">
        <div className="result-count">{filtered.length} items</div>
        {filtered.length ? (
          <div className="food-grid">{filtered.map((food) => <FoodCard key={food.id} food={food} onAdd={onAdd} />)}</div>
        ) : (
          <div className="no-results"><span>🔎</span><h2>No food found</h2><p>Try another search or category.</p></div>
        )}
      </section>
    </div>
  );
}