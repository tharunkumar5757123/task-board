import type { ActivityItem } from "../types";

export function ActivityLog({ items }: { items: ActivityItem[] }) {
  return (
    <section className="card">
      <h2>Activity Log</h2>
      {items.length === 0 ? (
        <p className="hint">No activity yet.</p>
      ) : (
        <ul className="activity-list">
          {items.slice(0, 10).map((item) => (
            <li key={item.id}>
              <strong>{new Date(item.timestamp).toLocaleString()}</strong>
              <span>{item.message}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
