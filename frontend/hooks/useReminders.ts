"use client";

import { useEffect, useMemo, useState } from "react";
import { Reminder } from "@/lib/types";
import { mockReminders } from "@/lib/mockReminders";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReminders(mockReminders);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  return useMemo(
    () => ({ reminders, isLoading, deleteReminder }),
    [reminders, isLoading]
  );
}
