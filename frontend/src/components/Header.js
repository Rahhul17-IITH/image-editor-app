import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import "../styles/Header.css";

export default function Header({ user, onSignOut, theme, setTheme }) {
  return (
    <header className="dashboard-header">
      <span className="dashboard-title">Dashboard</span>
      <div className="dashboard-actions">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <span className="dashboard-user">
          <FaUserCircle size={24} /> {user?.username}
        </span>
        <button className="signout-btn" onClick={onSignOut}>Sign Out</button>
      </div>
    </header>
  );
}
