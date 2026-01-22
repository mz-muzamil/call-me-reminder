"use client";

import { useEffect, useMemo, useState } from "react";
import { reminders as mockReminders } from "@/lib/mockReminders";
import { Reminder, ReminderStatus } from "@/lib/types";
import { formatReminderDate, getCountdownLabel, maskPhone } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import EmptyState from "@/components/reminders/EmptyState";
import { cn } from "@/lib/cn";

const filters: Array<{ label: string; value: ReminderStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" }
];

const statusBadge: Record<
  ReminderStatus,
  { label: string; className: string }
> = {
  scheduled: {
    label: "Scheduled",
    className: "border-primary/30 bg-primary/10 text-primary"
  },
  completed: {
    label: "Completed",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
  },
  failed: {
    label: "Failed",
    className: "border-destructive/30 bg-destructive/10 text-destructive"
  }
};

export default function ReminderTable() {
  const [statusFilter, setStatusFilter] = useState<ReminderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return mockReminders
      .filter((reminder) =>
        statusFilter === "all" ? true : reminder.status === statusFilter
      )
      .filter((reminder) => {
        if (!search) return true;
        return (
          reminder.title.toLowerCase().includes(search) ||
          reminder.message.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
  }, [query, statusFilter]);

  const handleDelete = (reminder: Reminder) => {
    console.log("Delete reminder", reminder.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-card md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                statusFilter === filter.value
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <Input
            className="w-full rounded-xl border-input bg-background/70 md:w-72"
            placeholder="Search by title or message"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button variant="outline" className="rounded-xl shadow-soft">
            Filters
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elevated">
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 border-b border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span>Title / Agent</span>
            <span>Status</span>
            <span>Target Phone</span>
            <span>Scheduled Time</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((reminder) => (
              <div
                key={reminder.id}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 text-sm text-foreground transition hover:bg-accent/60"
              >
                <div>
                  <p className="font-semibold text-foreground">{reminder.title}</p>
                  <p className="text-xs text-muted-foreground">{reminder.message}</p>
                </div>
                <Badge
                  variant="outline"
                  className={statusBadge[reminder.status].className}
                >
                  {statusBadge[reminder.status].label}
                </Badge>
                <span className="text-foreground">{maskPhone(reminder.phoneNumber)}</span>
                <div className="text-foreground">
                  <p>{mounted ? formatReminderDate(reminder.scheduledFor) : "—"}</p>
                  <p className="text-xs text-muted-foreground">
                    {mounted ? getCountdownLabel(reminder.scheduledFor) : "—"}
                  </p>
                </div>
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Actions for ${reminder.title}`}>
                        •••
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(reminder)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
