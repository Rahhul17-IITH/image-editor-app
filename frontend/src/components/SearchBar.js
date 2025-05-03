import React from "react";
import "../styles/searchbar.css";
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by tag..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
