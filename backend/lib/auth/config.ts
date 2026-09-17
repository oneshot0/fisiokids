import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db/client";
import { verifyPassword } from "./password";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [CredentialsProvider({
    name: "credentials",
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      const email = credentials?.email?.toLowerCase().trim();
      const password = credentials?.password;
      if (!email || !password) return null;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.active || !(await verifyPassword(password, user.passwordHash))) return null;
      return { id: user.id, email: user.email, role: user.role };
    },
  })],
  callbacks: {
    async jwt({ token, user }) { if (user) { token.sub = user.id; token.role = (user as { role?: string }).role; } return token; },
    async session({ session, token }) { if (session.user) { session.user.id = token.sub ?? ""; session.user.role = token.role as string; } return session; },
  },
  pages: { signIn: "/schools/login" },
};
