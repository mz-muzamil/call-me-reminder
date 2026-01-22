import Link from "next/link";
import ReminderList from "@/components/reminders/ReminderList";
import StatHighlights from "@/components/reminders/StatHighlights";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-white via-white to-blue-50 p-8 shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Call Me Reminder
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              Keep your future self on track.
            </h1>
            <p className="mt-3 max-w-xl text-base text-slate-600">
              Schedule voice reminders with precision. Monitor every upcoming call,
              stay in control, and keep your week moving.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800"
              href="/reminders/new"
            >
              Create reminder
            </Link>
            <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
              View activity
            </button>
          </div>
        </div>
      </section>

      <StatHighlights />

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Upcoming reminders</h2>
            <p className="text-sm text-slate-500">
              Sorted by the next call time, with live countdowns.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            href="/reminders/new"
          >
            + New reminder
          </Link>
        </div>
        <ReminderList />
      </section>
    </div>
  );
}
