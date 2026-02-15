import type { ActivityItem, BoardState, ColumnType, Task, TaskInput } from "../types";

export type BoardAction =
  | { type: "CREATE_TASK"; payload: { input: TaskInput; column: ColumnType } }
  | { type: "EDIT_TASK"; payload: { id: string; input: TaskInput } }
  | { type: "MOVE_TASK"; payload: { id: string; column: ColumnType } }
  | { type: "DELETE_TASK"; payload: { id: string } }
  | { type: "RESET_BOARD" };

function nowIso(): string {
  return new Date().toISOString();
}

function pushActivity(state: BoardState, message: string): BoardState {
  const item: ActivityItem = {
    id: crypto.randomUUID(),
    timestamp: nowIso(),
    message
  };

  return {
    ...state,
    activity: [item, ...state.activity].slice(0, 25)
  };
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "RESET_BOARD":
      return {
        tasks: [],
        activity: [
          {
            id: crypto.randomUUID(),
            timestamp: nowIso(),
            message: "Board reset"
          }
        ]
      };
    case "CREATE_TASK": {
      const task: Task = {
        id: crypto.randomUUID(),
        createdAt: nowIso(),
        column: action.payload.column,
        ...action.payload.input
      };
      return pushActivity(
        { ...state, tasks: [task, ...state.tasks] },
        `Task created: ${task.title}`
      );
    }
    case "EDIT_TASK": {
      const existing = state.tasks.find((task) => task.id === action.payload.id);
      if (!existing) {
        return state;
      }
      const updatedTasks = state.tasks.map((task) =>
        task.id === existing.id ? { ...task, ...action.payload.input } : task
      );
      return pushActivity({ ...state, tasks: updatedTasks }, `Task edited: ${existing.title}`);
    }
    case "MOVE_TASK": {
      const existing = state.tasks.find((task) => task.id === action.payload.id);
      if (!existing || existing.column === action.payload.column) {
        return state;
      }
      const updatedTasks = state.tasks.map((task) =>
        task.id === existing.id ? { ...task, column: action.payload.column } : task
      );
      return pushActivity(
        { ...state, tasks: updatedTasks },
        `Task moved: ${existing.title} -> ${action.payload.column.toUpperCase()}`
      );
    }
    case "DELETE_TASK": {
      const existing = state.tasks.find((task) => task.id === action.payload.id);
      if (!existing) {
        return state;
      }
      return pushActivity(
        { ...state, tasks: state.tasks.filter((task) => task.id !== existing.id) },
        `Task deleted: ${existing.title}`
      );
    }
    default:
      return state;
  }
}
