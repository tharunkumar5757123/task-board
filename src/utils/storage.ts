import type { BoardState } from "../types";

export const AUTH_KEY = "taskboard_auth";
export const REMEMBER_KEY = "taskboard_remembered_email";
export const BOARD_KEY = "taskboard_data";

export const defaultBoardState: BoardState = {
  tasks: [],
  activity: []
};

export function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function loadBoardState(): BoardState {
  const parsed = safeParseJSON<Partial<BoardState>>(
    localStorage.getItem(BOARD_KEY),
    {}
  );

  const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
  const activity = Array.isArray(parsed.activity) ? parsed.activity : [];

  return { tasks, activity };
}

export function saveBoardState(state: BoardState): void {
  localStorage.setItem(BOARD_KEY, JSON.stringify(state));
}
