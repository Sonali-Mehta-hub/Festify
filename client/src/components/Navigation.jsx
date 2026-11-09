import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../api/request.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navigation() {
  const { user, setUser } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function logout() {
    try {
      await request("/api/auth/logout", { method: "POST" });
      setUser(null);
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  }

  function search(event) {
    event.preventDefault();
    navigate(`/listings?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="site-header">
      <nav className="nav-wrap">
        <Link className="brand" to="/" aria-label="Festify home">
          <span className="brand-mark">f</span>
          festify<span className="brand-period">.</span>
        </Link>
        <div className="nav-links">
          <Link to="/listings">Explore</Link>
          <Link to="/listings/new">Add a place</Link>
        </div>
        <form className="nav-search" onSubmit={search}>
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations"
            aria-label="Search destinations"
          />
          <button type="submit" aria-label="Search">Search</button>
        </form>
        <div className="nav-account">
          {user ? (
            <>
              <span className="welcome-user">Hi, {user.username}</span>
              <button className="button button-outline button-small" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="nav-login" to="/login">Log in</Link>
              <Link className="button button-dark button-small" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
