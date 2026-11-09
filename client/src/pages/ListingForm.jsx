import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import request from "../api/request.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ListingForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState({ title: "", description: "", price: "", location: "", country: "" });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      request(`/api/listings/${id}`)
        .then(({ listing: result }) => {
          setListing({
            title: result.title || "",
            description: result.description || "",
            price: result.price ?? "",
            location: result.location || "",
            country: result.country || "",
          });
          setExistingImage(result.image?.url || "");
        })
        .catch((requestError) => setError(requestError.message));
    }
  }, [editing, id]);

  if (authLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  function changeField(event) {
    setListing((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData();
    Object.entries(listing).forEach(([key, value]) => formData.append(`listing[${key}]`, value));
    if (image) formData.append("listing[image]", image);
    try {
      const result = await request(editing ? `/api/listings/${id}` : "/api/listings", {
        method: editing ? "PUT" : "POST",
        body: formData,
      });
      navigate(`/listings/${result.listing._id}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="section form-section">
      <Link to={editing ? `/listings/${id}` : "/listings"} className="back-link">← Back</Link>
      <div className="form-heading">
        <p className="eyebrow">{editing ? "Update your destination" : "Share a destination"}</p>
        <h1>{editing ? <>Make it <em>just right.</em></> : <>Add your place<br />to <em>the collection.</em></>}</h1>
        <p>Give people a feel for the place and what makes it worth celebrating.</p>
      </div>
      {error && <ErrorMessage message={error} />}
      <form className="listing-form" onSubmit={submit}>
        <div className="form-row">
          <label>Place name<input name="title" value={listing.title} onChange={changeField} required maxLength="100" /></label>
          <label>Price per day (₹)<input name="price" type="number" min="0" step="1" value={listing.price} onChange={changeField} required /></label>
        </div>
        <label>Tell us about it<textarea name="description" rows="5" value={listing.description} onChange={changeField} required maxLength="2000" /></label>
        <div className="form-row">
          <label>City or location<input name="location" value={listing.location} onChange={changeField} required /></label>
          <label>Country<input name="country" value={listing.country} onChange={changeField} required /></label>
        </div>
        {existingImage && <img className="form-image-preview" src={existingImage} alt="Current destination" />}
        <label>Destination photo<input type="file" accept="image/png,image/jpeg" onChange={(event) => setImage(event.target.files?.[0] || null)} required={!editing} /></label>
        <button className="button button-dark" type="submit" disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Publish destination"}
        </button>
      </form>
    </section>
  );
}
