import { NextResponse } from "next/server";
import { requireSession, requireRole, responseError } from "@/lib/authorization/session";
import { getAvailability } from "@/lib/appointments/availability";
export async function GET(req: Request) {
  try {
    const s = await requireSession();
    requireRole(s, ["tutor", "terapeuta", "administrador"]);
    const date = new URL(req.url).searchParams.get("date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La fecha es obligatoria y debe usar YYYY-MM-DD." }, { status: 422 });
    const selected = new Date(`${date}T00:00:00`);
    if (Number.isNaN(selected.getTime())) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La fecha no es válida." }, { status: 422 });
    return NextResponse.json({ date, timezone: "America/Lima", slots: await getAvailability(selected) });
  } catch (e) {
    return responseError(e);
  }
}
