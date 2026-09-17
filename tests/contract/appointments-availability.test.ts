import { describe, expect, it } from "vitest";
import { appointmentCreateSchema } from "@/lib/validation/schemas";
describe("appointments contract", () => {
  it("requires child, therapist and exact start date", () => {
    expect(appointmentCreateSchema.safeParse({ childId: "c", therapistId: "t", startsAt: "2030-01-01T12:00:00Z" }).success).toBe(true);
    expect(appointmentCreateSchema.safeParse({ childId: "c" }).success).toBe(false);
  });
});
