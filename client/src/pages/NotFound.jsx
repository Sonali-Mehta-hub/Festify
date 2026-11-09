import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="empty-state not-found">
      <span className="eyebrow">404 · wrong turn</span>
      <h1>This place doesn’t exist.</h1>
      <Link className="button button-dark" to="/listings">Explore destinations</Link>
    </section>
  );
}
