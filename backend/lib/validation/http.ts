import { NextResponse } from "next/server";
export const httpError = (status: number, code: string, message: string, fieldErrors?: Record<string, string[]>) =>
  NextResponse.json({ code, message, ...(fieldErrors ? { fieldErrors } : {}) }, { status });
export const validationError = (message = "Revisa los datos enviados.") => httpError(422, "VALIDATION_ERROR", message);
