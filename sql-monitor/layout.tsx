// ============================================================================
// FILE: nextjs-app/app/layout.tsx
// ============================================================================
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQL Monitor AI",
  description: "Dashboard for monitoring and optimizing SQL Servers with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800 text-gray-200`}>{children}</body>
    </html>
  );
}