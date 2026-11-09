import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import request from "../api/request.js";
import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import ListingCard from "../components/ListingCard.jsx";
import Loading from "../components/Loading.jsx";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").toLowerCase();

  useEffect(() => {
    request("/api/listings")
      .then(({ listings: results }) => setListings(results))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleListings = listings.filter((listing) =>
    [listing.title, listing.location, listing.country, listing.description]
      .some((value) => value?.toLowerCase().includes(search))
  );

  return (
    <section className="section listings-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The Festify collection</p>
          <h1>Places to <em>gather.</em></h1>
        </div>
        <Link className="button button-dark" to="/listings/new">＋ Add a place</Link>
      </div>
      {search && <p className="search-status">Showing results for “{search}”</p>}
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && visibleListings.length === 0 && (
        <EmptyState
          title={search ? "No places found" : "The first place is waiting"}
          message={search ? "Try another destination or search term." : "Share a destination and help someone plan their next celebration."}
          action={<Link className="button button-dark" to="/listings/new">Add a place</Link>}
        />
      )}
      {!loading && visibleListings.length > 0 && (
        <div className="listing-grid">
          {visibleListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
