import { NextResponse } from "next/server";
import { requireSession, requireRole, responseError } from "@/lib/authorization/session";
import { getAvailability } from "@/lib/appointments/availability";
export async function GET(req: Request) { try { const s = await requireSession(); requireRole(s, ["tutor","terapeuta","administrador"]); const date = new URL(req.url).searchParams.get("date"); if (!date) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La fecha es obligatoria." }, { status: 422 }); return NextResponse.json({ date, timezone: "America/Lima", slots: await getAvailability(new Date(`${date}T00:00:00`)) }); } catch (e) { return responseError(e); } }
