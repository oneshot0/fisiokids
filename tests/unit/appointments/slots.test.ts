import { describe, expect, it } from "vitest";
import { generateSlots } from "@/lib/appointments/slots";
describe("appointment slots", () => {
  it("generates ten exact one-hour slots", () => {
    const slots = generateSlots(new Date("2030-01-02T00:00:00"), new Date("2029-01-01T00:00:00"));
    expect(slots).toHaveLength(10);
    expect(slots[0].startsAt.getHours()).toBe(12);
    expect(slots.at(-1)?.endsAt.getHours()).toBe(22);
  });
  it("does not generate past slots today", () => {
    const now = new Date("2030-01-02T15:30:00");
    expect(generateSlots(new Date("2030-01-02T00:00:00"), now).every(s => s.startsAt > now)).toBe(true);
  });
});
