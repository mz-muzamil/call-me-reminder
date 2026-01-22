import { Card } from "@/components/ui/card";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Contacts</h2>
        <p className="text-sm text-muted-foreground">
          Manage saved contacts for your reminders.
        </p>
      </div>
      <Card className="p-6 shadow-elevated">
        <p className="text-sm text-muted-foreground">Contact management is coming soon.</p>
      </Card>
    </div>
  );
}
