export type ColumnType = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  tags: string[];
  createdAt: string;
  column: ColumnType;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  message: string;
}

export interface BoardState {
  tasks: Task[];
  activity: ActivityItem[];
}

export interface TaskInput {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  tags: string[];
}
