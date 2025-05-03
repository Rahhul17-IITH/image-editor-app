import React from "react";
import { FaImages, FaUserCircle } from "react-icons/fa";
import "../styles/Sidebar.css";
export default function Sidebar({ current, setCurrent }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaImages size={32} />
        <span>PixelPal</span>
      </div>
      <nav>
        <ul>
          <li className={current === "gallery" ? "active" : ""} onClick={() => setCurrent("gallery")}>
            <FaImages /> Gallery
          </li>
          <li className={current === "profile" ? "active" : ""} onClick={() => setCurrent("profile")}>
            <FaUserCircle /> Profile
          </li>
        </ul>
      </nav>
    </aside>
  );
}

