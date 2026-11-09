import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" to="/">
        festify<span className="brand-period">.</span>
      </Link>
      <p>Find your place to celebrate.</p>
      <span>© {new Date().getFullYear()} Festify</span>
    </footer>
  );
}
