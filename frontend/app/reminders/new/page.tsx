import ReminderForm from "@/components/reminders/ReminderForm";
import Link from "next/link";

export default function NewReminderPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-sm font-semibold text-blue-600">
          ← Back to dashboard
        </Link>
        <h1 className="text-3xl font-semibold text-slate-900">Create a reminder</h1>
        <p className="text-slate-600">
          Schedule a call with a custom message. We'll call the moment it becomes due.
        </p>
      </div>
      <ReminderForm />
    </div>
  );
}
