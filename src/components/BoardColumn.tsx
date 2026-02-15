import type { ColumnType, Task } from "../types";
import { TaskCard } from "./TaskCard";

interface BoardColumnProps {
  label: string;
  column: ColumnType;
  tasks: Task[];
  onDropTask: (taskId: string, column: ColumnType) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export function BoardColumn({
  label,
  column,
  tasks,
  onDropTask,
  onEditTask,
  onDeleteTask
}: BoardColumnProps) {
  return (
    <section
      className="column"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/task-id");
        if (taskId) {
          onDropTask(taskId, column);
        }
      }}
    >
      <h2>{label}</h2>
      <div className="stack">
        {tasks.length === 0 && <p className="hint">No tasks</p>}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
        ))}
      </div>
    </section>
  );
}
