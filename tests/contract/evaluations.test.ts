import { describe, expect, it } from "vitest";
import { evaluationSchema } from "@/lib/validation/schemas";
describe("evaluations contract", () => {
  it("allows only tea levels 1, 2 and 3", () => {
    expect(evaluationSchema.safeParse({ childId: "c", therapistId: "t", recordedAt: "2030-01-01", teaLevel: 1 }).success).toBe(true);
    expect(evaluationSchema.safeParse({ childId: "c", therapistId: "t", recordedAt: "2030-01-01", teaLevel: 4 }).success).toBe(false);
  });
});
