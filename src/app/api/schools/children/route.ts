import { NextResponse } from "next/server";
import { requireRole, requireSession, responseError } from "@/lib/authorization/session";
import { childSchoolSchema } from "@/lib/validation/schemas";
import { linkChildToSchool } from "@/lib/schools/memberships";

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    requireRole(session, ["administrador"]);
    const parsed = childSchoolSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Revisa los datos enviados." }, { status: 422 });
    return NextResponse.json(await linkChildToSchool(parsed.data), { status: 201 });
  } catch (error) {
    return responseError(error);
  }
}
