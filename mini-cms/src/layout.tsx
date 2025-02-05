// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../src/pages/components/Navbar";

export const metadata: Metadata = {
  title: "My Mini CMS",
  description: "A simple CMS built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
