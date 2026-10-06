import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { categories } from "../data/food";

export default function Category({ foods, onAdd }) {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const items = foods.filter((f) => f.category === categoryId);

  if (!category) {
    return <div className="not-found"><h1>Category not found</h1><Link to="/explore" className="primary-btn">Back to menu</Link></div>;
  }

  return (
    <div className="category-page">
      <div className="category-top">
        <Link to="/explore" className="back-link"><ArrowLeft size={17} /> Back to menu</Link>
        <div className="big-emoji">{category.emoji}</div>
        <span className="eyebrow">{category.name.toUpperCase()} MENU</span>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      <section className="section">
        <div className="food-grid">{items.map((food) => <FoodCard key={food.id} food={food} onAdd={onAdd} />)}</div>
      </section>
    </div>
  );
}