import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard.jsx";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow eyebrow-light">Make a moment of it</p>
          <h1>Find your place<br />to <em>celebrate.</em></h1>
          <p className="hero-copy">
            From intimate getaways to once-in-a-lifetime gatherings, discover
            destinations worth celebrating.
          </p>
          <Link className="button button-cream" to="/listings">
            Explore destinations <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-caption">GOOD TIMES, GREAT PLACES — FESTIFY</div>
      </section>

      <section className="section home-intro">
        <div>
          <p className="eyebrow">Your next story starts here</p>
          <h2>Every celebration<br />deserves a <em>setting.</em></h2>
        </div>
        <p className="intro-copy">
          Find a backdrop as special as the occasion. Browse thoughtfully
          shared places, get inspired, and make your next gathering one to
          remember.
        </p>
      </section>

      <section className="feature-grid">
        <FeatureCard
          number="01"
          title="By the water"
          text="Sunset dinners, beachside vows, and celebrations with a little sea air."
          image="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85"
        />
        <FeatureCard
          number="02"
          title="Among the hills"
          text="A slower pace, open skies, and a wonderful excuse to get everyone together."
          image="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85"
        />
        <FeatureCard
          number="03"
          title="In the city"
          text="Find the energy, the architecture, and the perfect place to make a night of it."
          image="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85"
        />
      </section>
      <section className="home-cta">
        <p className="eyebrow eyebrow-light">A place for your kind of celebration</p>
        <h2>Have a place in mind?</h2>
        <Link className="button button-cream" to="/listings/new">Share it with Festify ↗</Link>
      </section>
    </>
  );
}
