import { describe, expect, it } from "vitest";
import { canTransition, validateTeaLevel } from "@/lib/evaluations/rules";
describe("evaluation rules", () => {
  it("allows only linear transitions", () => { expect(canTransition("draft", "active")).toBe(true); expect(canTransition("draft", "superseded")).toBe(false); expect(canTransition("superseded", "active")).toBe(false); });
  it("accepts only levels 1-3", () => { expect(() => validateTeaLevel(2)).not.toThrow(); expect(() => validateTeaLevel(4)).toThrow(); });
});
