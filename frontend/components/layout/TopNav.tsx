"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/reminders/new", label: "New Reminder" }
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-wide flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-soft">
            CM
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Call Me Reminder</p>
            <p className="text-xs text-slate-500">Voice-first scheduling</p>
          </div>
        </div>
        <nav className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
