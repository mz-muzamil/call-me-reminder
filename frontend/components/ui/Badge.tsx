import { cn } from "@/lib/cn";
import { ReminderStatus } from "@/lib/types";

const statusStyles: Record<ReminderStatus, string> = {
  scheduled: "bg-blue-50 text-blue-700",
  completed: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700"
};

interface BadgeProps {
  status: ReminderStatus;
}

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
