"use client";

import Link from "next/link";

const AUTH_INTRO_KEY = "fisiokids:auth-intro";

export function AuthIntroLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          window.sessionStorage.setItem(AUTH_INTRO_KEY, "1");
        } catch {
          // Session storage may be unavailable in private browsing.
        }
      }}
    >
      {children}
    </Link>
  );
}
