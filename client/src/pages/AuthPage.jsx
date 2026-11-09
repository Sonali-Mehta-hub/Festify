import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import request from "../api/request.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage({ mode }) {
  const signup = mode === "signup";
  const { user, setUser, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/listings" replace />;

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await request(`/api/auth/${signup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setUser(response.user);
      await refreshUser();
      navigate("/listings");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-image">
        <div>
          <p className="eyebrow eyebrow-light">Welcome to Festify</p>
          <h2>Good places.<br /><em>Good people.</em><br />Great memories.</h2>
        </div>
      </div>
      <div className="auth-form-wrap">
        <p className="eyebrow">{signup ? "Start your story" : "Welcome back"}</p>
        <h1>{signup ? "Create an account" : "Log in to Festify"}</h1>
        <p className="muted-copy">{signup ? "Join the community and start discovering." : "Your next great gathering is just around the corner."}</p>
        {error && <ErrorMessage message={error} />}
        <form className="auth-form" onSubmit={submit}>
          {signup && (
            <>
              <label>Username<input name="username" value={form.username} onChange={change} autoComplete="username" required /></label>
              <label>Email<input name="email" type="email" value={form.email} onChange={change} autoComplete="email" required /></label>
            </>
          )}
          {!signup && <label>Username<input name="username" value={form.username} onChange={change} autoComplete="username" required /></label>}
          {!signup && <label>Password<input name="password" type="password" value={form.password} onChange={change} autoComplete="current-password" required /></label>}
          {signup && <label>Password<input name="password" type="password" value={form.password} onChange={change} autoComplete="new-password" minLength="8" required /></label>}
          <button className="button button-dark auth-submit" disabled={submitting}>
            {submitting ? "Please wait…" : signup ? "Create account" : "Log in"}
          </button>
        </form>
        <div className="auth-divider"><span>or</span></div>
        <a className="google-login" href="/auth/google">Continue with Google</a>
        <p className="auth-switch">
          {signup ? "Already have an account?" : "New to Festify?"}{" "}
          <Link to={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Create an account"}</Link>
        </p>
      </div>
    </section>
  );
}
