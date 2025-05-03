import React, { useState } from "react";
import "../styles/profilemodal.css";

export default function ChangePasswordModal({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // TODO: Implement actual password change logic with Amplify
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Password changed (stub).");
    setTimeout(onClose, 1500);
  };

  return (
    <div className="profile-modal-bg">
      <div className="profile-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Change</button>
        </form>
        {message && <div className="profile-modal-message">{message}</div>}
      </div>
    </div>
  );
}
