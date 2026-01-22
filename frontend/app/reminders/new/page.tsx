import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewReminderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Create Reminder</h2>
        <p className="text-sm text-muted-foreground">
          Schedule a call with a short message and delivery time.
        </p>
      </div>
      <Card className="p-6 shadow-elevated">
        <form className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Reminder title</label>
            <Input placeholder="Dentist appointment" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone number</label>
            <Input placeholder="+14155552671" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Reminder message</label>
            <textarea
              className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Hi! This is your reminder about..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date & time</label>
            <Input type="datetime-local" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Timezone</label>
            <Input value="Auto-detected" readOnly />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              We will call the phone number and speak the reminder message.
            </p>
            <Button type="button">Schedule reminder</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
