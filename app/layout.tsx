import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vera | We Fix Websites",
  description: "Your website is broken, slow, or doesn't exist. We fix that. Fast, modern sites that bring in customers—not scare them away.",
  keywords: ["web design", "website repair", "web development", "fix website", "small business website"],
  openGraph: {
    title: "Vera | We Fix Websites",
    description: "Your website is broken, slow, or doesn't exist. We fix that.",
    type: "website",
    url: "https://tryvera.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
