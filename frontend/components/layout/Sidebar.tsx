"use client";

/// <reference types="react" />

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
// Use a local pill to avoid undefined component issues at runtime.

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Reminders", href: "/" },
  { label: "Contacts", href: "/contacts" },
  { label: "Settings", href: "/settings" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-border bg-card px-4 pb-6 pt-8 shadow-soft lg:flex">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-soft">
          CR
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">CallReminder</p>
          <p className="text-xs text-muted-foreground">Workspace</p>
        </div>
      </div>

      <nav className="mt-7 flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-accent text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              )}
              href={item.href}
            >
              <span>{item.label}</span>
              {item.label === "Reminders" ? (
                <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  12
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-lg border border-border bg-accent/60 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Next call
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">In 2h 12m</p>
        <p className="text-xs text-muted-foreground">Dr. Patel check-in</p>
      </div>
    </aside>
  );
}
