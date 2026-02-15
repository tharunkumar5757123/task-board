import { describe, expect, it } from "vitest";
import { boardReducer } from "./boardReducer";
import type { BoardState } from "../types";

const emptyState: BoardState = {
  tasks: [],
  activity: []
};

describe("boardReducer", () => {
  it("creates and deletes a task while tracking activity", () => {
    const created = boardReducer(emptyState, {
      type: "CREATE_TASK",
      payload: {
        column: "todo",
        input: {
          title: "Build UI",
          description: "",
          priority: "high",
          dueDate: "",
          tags: ["frontend"]
        }
      }
    });
    expect(created.tasks).toHaveLength(1);
    expect(created.activity[0].message).toContain("Task created");

    const deleted = boardReducer(created, {
      type: "DELETE_TASK",
      payload: { id: created.tasks[0].id }
    });
    expect(deleted.tasks).toHaveLength(0);
    expect(deleted.activity[0].message).toContain("Task deleted");
  });
});
