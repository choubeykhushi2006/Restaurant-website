import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category, count }) {
  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <div className="category-emoji">{category.emoji}</div>
      <div>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <small>{count} items</small>
      </div>
      <span className="circle-arrow"><ArrowUpRight size={18} /></span>
    </Link>
  );
}