import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eleni Tadese — Full-Stack Developer",
  description:
    "Eleni Tadese is a full-stack developer and 4th-year Computer Science & Engineering student at ASTU, building AI-powered and full-stack web applications.",
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-lime px-4 py-2 text-sm font-medium text-on-lime transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
