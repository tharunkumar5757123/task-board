import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <article
      className="task-card"
      draggable
      onDragStart={(event) => event.dataTransfer.setData("text/task-id", task.id)}
    >
      <header className="row spread">
        <h3>{task.title}</h3>
        <span className={`pill ${task.priority}`}>{task.priority}</span>
      </header>
      {task.description && <p>{task.description}</p>}
      <p className="meta">Due: {task.dueDate || "N/A"}</p>
      <p className="meta">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
      {task.tags.length > 0 && (
        <div className="row wrap">
          {task.tags.map((tag) => (
            <span className="tag" key={`${task.id}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="row">
        <button type="button" className="secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
