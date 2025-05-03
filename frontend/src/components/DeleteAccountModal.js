import React, { useState } from "react";
import "../styles/profilemodal.css";

export default function DeleteAccountModal({ onClose }) {
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  // TODO: Implement actual delete logic with Amplify
  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm === "DELETE") {
      setMessage("Account deleted (stub).");
      setTimeout(onClose, 1500);
    } else {
      setMessage("Type DELETE to confirm.");
    }
  };

  return (
    <div className="profile-modal-bg">
      <div className="profile-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Delete Account</h3>
        <form onSubmit={handleDelete}>
          <p>Type <b>DELETE</b> to confirm account deletion:</p>
          <input
            type="text"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button type="submit" className="danger">Delete Account</button>
        </form>
        {message && <div className="profile-modal-message">{message}</div>}
      </div>
    </div>
  );
}
