import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vera | Websites for Small Business",
  description: "Professional websites for small businesses. Fast turnaround. Fair prices. No headaches.",
  keywords: ["web design", "small business website", "web development", "professional website", "affordable website"],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Vera | Websites for Small Business",
    description: "Professional websites for small businesses. Fast turnaround. Fair prices. No headaches.",
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
