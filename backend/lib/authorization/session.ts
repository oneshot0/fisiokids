import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { NextResponse } from "next/server";
export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Response(JSON.stringify({ code: "UNAUTHORIZED", message: "Debes iniciar sesión." }), { status: 401, headers: { "content-type": "application/json" } });
  return session;
}
export function requireRole(session: { user: { role?: string } }, roles: string[]) {
  if (!session.user.role || !roles.includes(session.user.role)) throw new Response(JSON.stringify({ code: "FORBIDDEN", message: "No tienes permisos para esta operación." }), { status: 403, headers: { "content-type": "application/json" } });
}
export function responseError(error: unknown) {
  if (error instanceof Response) return error;
  return NextResponse.json({ code: "INTERNAL_ERROR", message: "No pudimos completar la operación." }, { status: 500 });
}
