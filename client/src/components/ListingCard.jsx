import { Link } from "react-router-dom";
import { fallbackImage, formatPrice } from "../utils/listing.js";

export default function ListingCard({ listing }) {
  return (
    <Link className="listing-card" to={`/listings/${listing._id}`}>
      <div className="listing-image-wrap">
        <img
          src={listing.image?.url || fallbackImage}
          alt={listing.title}
          loading="lazy"
        />
        <span className="image-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="listing-card-info">
        <div>
          <h2>{listing.title}</h2>
          <p>{listing.location}{listing.country ? `, ${listing.country}` : ""}</p>
        </div>
        <strong>{formatPrice(listing.price)}<small> / day</small></strong>
      </div>
    </Link>
  );
}
