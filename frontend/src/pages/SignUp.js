import React, { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "../styles/auth.css";

export default function SignUp() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const { nextStep, userId } = await signUp({
        username: form.username,
        password: form.password,
        options: { userAttributes: { email: form.email } },
      });
      // Handle nextStep for verification
      if (nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
        setStep(2);
        setInfo("A verification code has been sent to your email. Please enter it below.");
      } else if (nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        setInfo("Sign-up complete! You can now sign in.");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setInfo("Please check your email for a verification link.");
      }
    } catch (err) {
      setError(err.message || "Failed to sign up");
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: form.username,
        confirmationCode,
      });
      if (isSignUpComplete) {
        setInfo("Sign-up confirmed! Redirecting to sign in...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setInfo("Confirmation step not complete. Please check your code.");
      }
    } catch (err) {
      setError(err.message || "Failed to confirm sign up");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          {step === 1 ? (
            <>
              <h2>Let's get started</h2>
              <p>Create your account</p>
              <form onSubmit={handleSignUp}>
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input name="username" placeholder="Username" onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                </div>
                <button type="submit" className="auth-btn">Create Account</button>
                {error && <div className="auth-error">{error}</div>}
                {info && <div className="auth-info">{info}</div>}
              </form>
              <div className="auth-switch">
                <span>Already have an account?</span>
                <Link to="/signin">Sign In</Link>
              </div>
            </>
          ) : (
            <>
              <h2>Confirm Sign Up</h2>
              <form onSubmit={handleConfirm}>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    name="confirmationCode"
                    placeholder="Confirmation Code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-btn">Confirm</button>
                {error && <div className="auth-error">{error}</div>}
                {info && <div className="auth-info">{info}</div>}
              </form>
            </>
          )}
        </div>
        <div className="auth-right">
          <h2>Glad to see you!</h2>
          <p>Enter your personal details and start your journey with us</p>
        </div>
      </div>
    </div>
  );
}


