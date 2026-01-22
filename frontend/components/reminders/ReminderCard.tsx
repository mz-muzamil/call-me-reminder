import { Reminder } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { formatReminderDate, getCountdownLabel, maskPhone } from "@/lib/format";

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: () => void;
}

export default function ReminderCard({ reminder, onDelete }: ReminderCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{reminder.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{reminder.message}</p>
        </div>
        <Badge status={reminder.status} />
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Date & time</span>
          <span className="font-semibold text-slate-900">
            {formatReminderDate(reminder.scheduledFor)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Phone</span>
          <span className="font-semibold text-slate-900">
            {maskPhone(reminder.phoneNumber)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Countdown</span>
          <span className="font-semibold text-slate-900">
            {getCountdownLabel(reminder.scheduledFor)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="text-sm font-semibold text-blue-600">Edit</button>
        <button
          className="text-sm font-semibold text-slate-500 transition hover:text-slate-700"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </Card>
  );
}
