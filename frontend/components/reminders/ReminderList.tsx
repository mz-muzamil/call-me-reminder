"use client";

import { useMemo, useState } from "react";
import ReminderCard from "@/components/reminders/ReminderCard";
import EmptyState from "@/components/reminders/EmptyState";
import { ReminderStatus } from "@/lib/types";
import { useReminders } from "@/hooks/useReminders";
import { cn } from "@/lib/cn";
import SkeletonCard from "@/components/ui/SkeletonCard";

const filters: Array<{ label: string; value: ReminderStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" }
];

export default function ReminderList() {
  const { reminders, isLoading, deleteReminder } = useReminders();
  const [statusFilter, setStatusFilter] = useState<ReminderStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return reminders
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
  }, [reminders, query, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                statusFilter === filter.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              )}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:w-72"
            placeholder="Search by title or message"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Filters
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="card-grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="card-grid">
          {filtered.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onDelete={() => deleteReminder(reminder.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
