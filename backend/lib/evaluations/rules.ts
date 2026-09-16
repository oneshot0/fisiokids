export type EvaluationStatus = "draft" | "active" | "superseded";
export function validateTeaLevel(level: number) { if (![1, 2, 3].includes(level)) throw new Error("INVALID_LEVEL"); }
export function canTransition(from: EvaluationStatus, to: EvaluationStatus) { return (from === "draft" && to === "active") || (from === "active" && to === "superseded") || from === to; }
