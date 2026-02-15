import { FormEvent, useMemo, useState } from "react";
import type { Priority, Task, TaskInput } from "../types";

interface TaskFormProps {
  initialTask?: Task;
  onCancel: () => void;
  onSubmit: (input: TaskInput) => void;
}

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function TaskForm({ initialTask, onCancel, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [priority, setPriority] = useState<Priority>(initialTask?.priority ?? "medium");
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? "");
  const [tagsValue, setTagsValue] = useState((initialTask?.tags ?? []).join(", "));
  const [error, setError] = useState("");

  const isEdit = useMemo(() => Boolean(initialTask), [initialTask]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      priority,
      dueDate,
      tags: parseTags(tagsValue)
    });
  }

  return (
    <form className="stack card task-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Task" : "Create Task"}</h2>
      <label className="stack">
        Title *
        <input value={title} onChange={(event) => setTitle(event.target.value)} required />
      </label>
      <label className="stack">
        Description
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <label className="stack">
        Priority
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label className="stack">
        Due Date
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </label>
      <label className="stack">
        Tags (comma-separated)
        <input value={tagsValue} onChange={(event) => setTagsValue(event.target.value)} />
      </label>
      {error && <p className="error">{error}</p>}
      <div className="row">
        <button type="submit">{isEdit ? "Save" : "Create"}</button>
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
