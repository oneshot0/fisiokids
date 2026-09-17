import { NextResponse } from "next/server";
import { requireRole, requireSession, responseError } from "@/lib/authorization/session";
import { rescheduleAppointment } from "@/lib/appointments/reschedule";
import { rescheduleSchema } from "@/lib/validation/schemas";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireSession();
    requireRole(session, ["administrador"]);
    const parsed = rescheduleSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Revisa los datos enviados." }, { status: 422 });
    return NextResponse.json(await rescheduleAppointment((await params).id, parsed.data.startsAt));
  } catch (error) {
    if (error instanceof Error && error.message === "CONFLICT") {
      return NextResponse.json({ code: "CONFLICT", message: "El horario seleccionado ya no está disponible. Elige otro, por favor." }, { status: 409 });
    }
    if (error instanceof Error && error.message === "INVALID_SLOT") {
      return NextResponse.json({ code: "VALIDATION_ERROR", message: "La hora debe ser un bloque válido de 60 minutos entre 12:00 y 22:00." }, { status: 422 });
    }
    return responseError(error);
  }
}
