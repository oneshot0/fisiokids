import { NextResponse } from "next/server";
import { requireRole, requireSession, responseError } from "@/lib/authorization/session";
import { schoolMembershipSchema } from "@/lib/validation/schemas";
import { upsertSchoolMembership } from "@/lib/schools/memberships";

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    requireRole(session, ["administrador"]);
    const parsed = schoolMembershipSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Revisa los datos enviados." }, { status: 422 });
    return NextResponse.json(await upsertSchoolMembership(parsed.data), { status: 201 });
  } catch (error) {
    return responseError(error);
  }
}
