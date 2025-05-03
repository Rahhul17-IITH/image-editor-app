import React, { useState } from "react";
import "../styles/profilepanel.css";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";


export default function ProfilePanel({ user }) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  return (
    <div className="profile-panel">
      <h2>Profile</h2>
      <div className="profile-info">
        <div><strong>Username:</strong> {user?.username}</div>
        <div><strong>Email:</strong> {user?.signInDetails?.loginId || user?.attributes?.email}</div>
      </div>
      <div className="profile-actions">
        <button onClick={() => setShowChangePassword(true)}>Change Password</button>
        <button onClick={() => setShowDeleteAccount(true)} className="danger">Delete Account</button>
      </div>
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
      {showDeleteAccount && <DeleteAccountModal onClose={() => setShowDeleteAccount(false)} />}
    </div>
  );
}
