"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TopNav() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card/80 px-6 py-4 shadow-soft backdrop-blur lg:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Overview
        </p>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
            <circle cx="11" cy="11" r="7" />
          </svg>
          <Input
            className="w-64 rounded-xl border-input bg-background/70 pl-9"
            placeholder="Search reminders, contacts..."
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? (
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.42-1.42M7.06 7.06 5.64 5.64m12.72 0-1.42 1.42M7.06 16.94l-1.42 1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
              />
            </svg>
          )}
        </Button>

        <Link href="/reminders/new">
          <Button className="gap-2 shadow-soft">
            <span className="text-lg leading-none">+</span>
            Create Reminder
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl px-2 py-1.5 shadow-soft">
              <Avatar className="h-8 w-8">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm text-muted-foreground lg:block">John Doe</span>
              <svg
                aria-hidden="true"
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Signed in as</p>
                <p className="text-sm font-semibold">john@remind.dev</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
