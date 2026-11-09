import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import request from "../api/request.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { fallbackImage, formatPrice } from "../utils/listing.js";

export default function ListingPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("5");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request(`/api/listings/${id}`)
      .then(({ listing: result }) => {
        setListing(result);
        setError("");
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id, refresh]);

  async function deleteListing() {
    if (!window.confirm("Delete this place? This cannot be undone.")) return;
    try {
      await request(`/api/listings/${id}`, { method: "DELETE" });
      navigate("/listings");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function addReview(event) {
    event.preventDefault();
    setError("");
    try {
      await request(`/api/listings/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: { rating: Number(rating), comment } }),
      });
      setComment("");
      setRating("5");
      setRefresh((value) => value + 1);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function deleteReview(reviewId) {
    try {
      await request(`/api/listings/${id}/reviews/${reviewId}`, { method: "DELETE" });
      setRefresh((value) => value + 1);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (loading) return <Loading />;
  if (error && !listing) return <ErrorMessage message={error} />;
  if (!listing) return null;

  const isOwner = user && listing.owner?._id === user._id;
  return (
    <section className="section detail-section">
      <Link to="/listings" className="back-link">← All destinations</Link>
      {error && <ErrorMessage message={error} />}
      <div className="detail-heading">
        <div>
          <p className="eyebrow">{listing.location}{listing.country ? ` · ${listing.country}` : ""}</p>
          <h1>{listing.title}</h1>
        </div>
        <strong className="detail-price">{formatPrice(listing.price)}<small> / day</small></strong>
      </div>
      <img className="detail-image" src={listing.image?.url || fallbackImage} alt={listing.title} />
      <div className="detail-columns">
        <article className="detail-description">
          <p className="eyebrow">A little about this place</p>
          <h2>Make it <em>memorable.</em></h2>
          <p className="description-copy">{listing.description}</p>
          <p className="host-line">Shared by <strong>{listing.owner?.username || "a Festify host"}</strong></p>
          {isOwner && (
            <div className="owner-actions">
              <Link className="button button-dark" to={`/listings/${id}/edit`}>Edit place</Link>
              <button className="button button-outline" onClick={deleteListing}>Delete</button>
            </div>
          )}
        </article>
        <aside className="review-panel">
          <p className="eyebrow">Community notes</p>
          <h2>{listing.reviews?.length || 0} <em>reviews</em></h2>
          {listing.reviews?.length ? listing.reviews.map((review) => (
            <article className="review-item" key={review._id}>
              <div className="review-item-top">
                <strong>{review.author?.username || "Festify guest"}</strong>
                <span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
              </div>
              <p>{review.comment}</p>
              {user && review.author?._id === user._id && (
                <button className="text-button" onClick={() => deleteReview(review._id)}>Remove review</button>
              )}
            </article>
          )) : <p className="muted-copy">No reviews yet. Be the first to share an experience.</p>}
          {user ? (
            <form className="review-form" onSubmit={addReview}>
              <label htmlFor="rating">Your rating</label>
              <select id="rating" value={rating} onChange={(event) => setRating(event.target.value)}>
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
              </select>
              <label htmlFor="review">Your experience</label>
              <textarea id="review" value={comment} onChange={(event) => setComment(event.target.value)} required rows="3" maxLength="1000" />
              <button className="button button-dark" type="submit">Post review</button>
            </form>
          ) : (
            <Link className="text-link" to="/login">Log in to leave a review →</Link>
          )}
        </aside>
      </div>
    </section>
  );
}
