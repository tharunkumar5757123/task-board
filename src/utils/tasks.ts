import type { Priority, Task } from "../types";

export function sortByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) {
      return 0;
    }
    if (!a.dueDate) {
      return 1;
    }
    if (!b.dueDate) {
      return -1;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

export function filterTasks(tasks: Task[], search: string, priority: "" | Priority): Task[] {
  const normalizedSearch = search.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesSearch =
      normalizedSearch.length === 0 || task.title.toLowerCase().includes(normalizedSearch);
    const matchesPriority = !priority || task.priority === priority;
    return matchesSearch && matchesPriority;
  });
}
