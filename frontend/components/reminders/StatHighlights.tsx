import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Scheduled Today",
    value: "8",
    delta: "+12%",
    tone: "positive"
  },
  {
    label: "Total Calls Made",
    value: "142",
    delta: "this week",
    tone: "neutral"
  },
  {
    label: "Success Rate",
    value: "98%",
    delta: "+2.4%",
    tone: "positive"
  }
];

export default function StatHighlights() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 shadow-elevated">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
            <span
              className={
                stat.tone === "positive"
                  ? "text-xs font-semibold text-emerald-500"
                  : "text-xs font-semibold text-muted-foreground"
              }
            >
              {stat.delta}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
