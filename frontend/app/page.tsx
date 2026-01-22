import StatHighlights from "@/components/reminders/StatHighlights";
import ReminderTable from "@/components/reminders/ReminderTable";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StatHighlights />

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Upcoming Reminders</h2>
            <p className="text-sm text-muted-foreground">
              Track upcoming reminders with live status updates.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl shadow-soft">
              Filter
            </Button>
            <Button variant="secondary" className="rounded-xl shadow-soft">
              View All History
            </Button>
          </div>
        </div>
        <ReminderTable />
      </section>
    </div>
  );
}
