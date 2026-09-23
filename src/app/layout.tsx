import type { Metadata } from "next";
import "./globals.css";

// NOTE: this sandbox has no access to fonts.googleapis.com, so Space Grotesk
// and Inter are loaded via system-font fallback stacks in globals.css instead
// of next/font/google. On your machine (real internet), swap back to:
//
//   import { Space_Grotesk, Inter } from "next/font/google";
//   const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500","600","700"] });
//   const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400","500","600"] });
//
// then add `${spaceGrotesk.variable} ${inter.variable}` back to the <html> className below.

export const metadata: Metadata = {
  title: "Eleni Tadese — Full-Stack Developer",
  description:
    "Eleni Tadese is a full-stack developer and 4th-year Computer Science & Engineering student at ASTU, building AI-powered and full-stack web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
