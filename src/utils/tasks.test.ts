import { describe, expect, it } from "vitest";
import { sortByDueDate } from "./tasks";
import type { Task } from "../types";

function task(id: string, dueDate: string): Task {
  return {
    id,
    title: id,
    description: "",
    priority: "medium",
    dueDate,
    tags: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    column: "todo"
  };
}

describe("sortByDueDate", () => {
  it("sorts tasks by due date with empty values last", () => {
    const result = sortByDueDate([task("a", ""), task("b", "2026-02-03"), task("c", "2026-01-15")]);
    expect(result.map((item) => item.id)).toEqual(["c", "b", "a"]);
  });
});
