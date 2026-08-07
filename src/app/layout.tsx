import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    locale: "es_PE",
    type: "website",
    url: site.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body className={`${nunito.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
