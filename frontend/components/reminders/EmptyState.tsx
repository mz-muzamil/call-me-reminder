import Card from "@/components/ui/Card";

export default function EmptyState() {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        ✨
      </div>
      <h3 className="text-lg font-semibold text-slate-900">No reminders found</h3>
      <p className="mt-2 text-sm text-slate-500">
        Create your first reminder to see it appear here with live call status.
      </p>
    </Card>
  );
}
