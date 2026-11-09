export const fallbackImage =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85";

export function formatPrice(price) {
  if (price == null || price === "") return "Price on request";
  return `₹${Number(price).toLocaleString("en-IN")}`;
}
