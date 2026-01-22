import Card from "@/components/ui/Card";

const stats = [
  { label: "Scheduled this week", value: "14" },
  { label: "Successful calls", value: "92%" },
  { label: "Avg. time to call", value: "< 15s" }
];

export default function StatHighlights() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
