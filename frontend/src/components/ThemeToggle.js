import React from "react";
import "../styles/ThemeToggle.css";
export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "🌙 Dark" : "🔆 Light"}
    </button>
  );
}


