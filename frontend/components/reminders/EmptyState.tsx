import { Card } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card className="p-10 text-center shadow-elevated">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        ✨
      </div>
      <h3 className="text-lg font-semibold text-foreground">No reminders found</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Create your first reminder to see it appear here with live call status.
      </p>
    </Card>
  );
}
