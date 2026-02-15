import { useMemo, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { useBoard } from "../state/BoardContext";
import type { ColumnType, Priority, Task } from "../types";
import { filterTasks, sortByDueDate } from "../utils/tasks";
import { BoardColumn } from "../components/BoardColumn";
import { TaskForm } from "../components/TaskForm";
import { ActivityLog } from "../components/ActivityLog";

export function BoardPage() {
  const { logout } = useAuth();
  const { state, dispatch } = useBoard();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"" | Priority>("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeColumn, setActiveColumn] = useState<ColumnType>("todo");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(state.tasks, search, priorityFilter);
    return sortByDueDate(filtered);
  }, [state.tasks, search, priorityFilter]);

  const todoTasks = visibleTasks.filter((task) => task.column === "todo");
  const doingTasks = visibleTasks.filter((task) => task.column === "doing");
  const doneTasks = visibleTasks.filter((task) => task.column === "done");

  function startCreateTask(column: ColumnType) {
    setActiveColumn(column);
    setEditingTask(null);
    setShowTaskForm(true);
  }

  return (
    <main className="board-layout">
      <header className="card row spread">
        <h1>Task Board</h1>
        <div className="row">
          <button type="button" onClick={() => startCreateTask("todo")}>
            + New Task
          </button>
          <button
            type="button"
            className="danger"
            onClick={() => {
              if (window.confirm("Reset board and clear all tasks?")) {
                dispatch({ type: "RESET_BOARD" });
              }
            }}
          >
            Reset Board
          </button>
          <button type="button" className="secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <section className="card controls">
        <label className="stack">
          Search title
          <input
            placeholder="Search by title"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="stack">
          Filter priority
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value as "" | Priority)}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </section>

      {showTaskForm && (
        <TaskForm
          initialTask={editingTask ?? undefined}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onSubmit={(input) => {
            if (editingTask) {
              dispatch({ type: "EDIT_TASK", payload: { id: editingTask.id, input } });
            } else {
              dispatch({ type: "CREATE_TASK", payload: { input, column: activeColumn } });
            }
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <section className="board-grid">
        <BoardColumn
          label="Todo"
          column="todo"
          tasks={todoTasks}
          onDropTask={(taskId, column) => dispatch({ type: "MOVE_TASK", payload: { id: taskId, column } })}
          onEditTask={(task) => {
            setEditingTask(task);
            setShowTaskForm(true);
          }}
          onDeleteTask={(id) => dispatch({ type: "DELETE_TASK", payload: { id } })}
        />
        <BoardColumn
          label="Doing"
          column="doing"
          tasks={doingTasks}
          onDropTask={(taskId, column) => dispatch({ type: "MOVE_TASK", payload: { id: taskId, column } })}
          onEditTask={(task) => {
            setEditingTask(task);
            setShowTaskForm(true);
          }}
          onDeleteTask={(id) => dispatch({ type: "DELETE_TASK", payload: { id } })}
        />
        <BoardColumn
          label="Done"
          column="done"
          tasks={doneTasks}
          onDropTask={(taskId, column) => dispatch({ type: "MOVE_TASK", payload: { id: taskId, column } })}
          onEditTask={(task) => {
            setEditingTask(task);
            setShowTaskForm(true);
          }}
          onDeleteTask={(id) => dispatch({ type: "DELETE_TASK", payload: { id } })}
        />
      </section>

      <ActivityLog items={state.activity} />
    </main>
  );
}
