export default function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <span className="empty-mark">✳</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}
