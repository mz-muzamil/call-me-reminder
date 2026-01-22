import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure notifications, call preferences, and schedules.
        </p>
      </div>
      <Card className="p-6 shadow-elevated">
        <p className="text-sm text-muted-foreground">
          Settings controls will appear here.
        </p>
      </Card>
    </div>
  );
}
