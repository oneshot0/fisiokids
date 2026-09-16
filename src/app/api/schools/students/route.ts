import { NextResponse } from "next/server";
import { requireSession, requireRole, responseError } from "@/lib/authorization/session";
import { schoolStudents } from "@/lib/schools/students";
export async function GET() { try { const s = await requireSession(); requireRole(s, ["colegio"]); return NextResponse.json({ students: await schoolStudents(s.user.id) }); } catch (e) { if (e instanceof Error && e.message === "FORBIDDEN") return NextResponse.json({ code: "FORBIDDEN", message: "No tienes una institución autorizada." }, { status: 403 }); return responseError(e); } }
