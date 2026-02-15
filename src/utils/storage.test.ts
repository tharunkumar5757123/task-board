import { describe, expect, it } from "vitest";
import { safeParseJSON } from "./storage";

describe("safeParseJSON", () => {
  it("returns fallback on invalid json", () => {
    const result = safeParseJSON("{invalid", { ok: false });
    expect(result).toEqual({ ok: false });
  });

  it("returns parsed object on valid json", () => {
    const result = safeParseJSON('{"ok":true}', { ok: false });
    expect(result).toEqual({ ok: true });
  });
});
