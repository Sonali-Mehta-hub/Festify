export default function FeatureCard({ number, title, text, image }) {
  return (
    <article className="feature-card">
      <img src={image} alt="" loading="lazy" />
      <div className="feature-card-shade" />
      <div className="feature-copy">
        <span>{number} / DESTINATION IDEAS</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
