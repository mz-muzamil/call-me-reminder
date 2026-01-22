import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/layout/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Call Me Reminder",
  description: "Schedule reminders that call you when it's time."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        <main className="container-wide pb-16 pt-8">{children}</main>
      </body>
    </html>
  );
}
