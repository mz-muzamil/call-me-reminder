export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-4 w-40 rounded-full bg-slate-200" />
          <div className="h-3 w-56 rounded-full bg-slate-200" />
        </div>
        <div className="h-6 w-20 rounded-full bg-slate-200" />
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-3 w-full rounded-full bg-slate-200" />
        <div className="h-3 w-full rounded-full bg-slate-200" />
        <div className="h-3 w-full rounded-full bg-slate-200" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-12 rounded-full bg-slate-200" />
        <div className="h-3 w-12 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
