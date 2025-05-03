import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/auth.css";

export default function SignIn() {
  const { signIn } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <h2>PixelPal</h2>
          <p>Sign in to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input name="username" placeholder="Username" onChange={handleChange} required autoComplete="username" />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required autoComplete="current-password" />
            </div>
            <button type="submit" className="auth-btn">Sign In</button>
            {error && <div className="auth-error">{error}</div>}
          </form>
          <div className="auth-switch">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="auth-right">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
        </div>
      </div>
    </div>
  );
}

