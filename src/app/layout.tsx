import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Lead Qualification & Follow-Up Agent",
  description:
    "Portfolio demonstration of an AI agent that qualifies sales leads, recommends next actions, and drafts follow-up emails using fictional sample data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
