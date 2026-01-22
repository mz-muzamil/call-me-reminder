"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reminderSchema, ReminderFormValues } from "@/lib/validation";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { format } from "date-fns";

export default function ReminderForm() {
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      timezone
    }
  });

  useEffect(() => {
    setValue("timezone", timezone);
  }, [setValue, timezone]);

  const scheduledFor = watch("scheduledFor");

  const onSubmit = async (values: ReminderFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Reminder payload", values);
  };

  return (
    <Card className="p-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Reminder title</label>
            <input
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition",
                errors.title
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              )}
              placeholder="Dentist appointment"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs font-semibold text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone number</label>
            <input
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition",
                errors.phoneNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              )}
              placeholder="+14155552671"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-xs font-semibold text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Reminder message</label>
          <textarea
            rows={4}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition",
              errors.message
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            )}
            placeholder="Hi! This is your friendly reminder to..."
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs font-semibold text-red-500">{errors.message.message}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Date & time</label>
            <input
              type="datetime-local"
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition",
                errors.scheduledFor
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              )}
              {...register("scheduledFor")}
            />
            {errors.scheduledFor && (
              <p className="text-xs font-semibold text-red-500">
                {errors.scheduledFor.message}
              </p>
            )}
            {scheduledFor && !errors.scheduledFor && (
              <p className="text-xs text-slate-500">
                Scheduled for {format(new Date(scheduledFor), "PPpp")} ({timezone})
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Timezone</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
              readOnly
              value={timezone}
            />
            <p className="text-xs text-slate-500">Auto-detected from your device.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            We'll call the phone number at the scheduled time and read the reminder message.
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-soft transition",
              isSubmitting
                ? "bg-slate-400"
                : "bg-blue-600 hover:-translate-y-0.5 hover:bg-blue-700"
            )}
          >
            {isSubmitting ? "Scheduling..." : "Schedule reminder"}
          </button>
        </div>
      </form>
    </Card>
  );
}
