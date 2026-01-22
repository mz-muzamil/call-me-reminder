export type ReminderStatus = "scheduled" | "completed" | "failed";

export interface Reminder {
  id: string;
  title: string;
  message: string;
  phoneNumber: string;
  scheduledFor: string;
  timezone: string;
  status: ReminderStatus;
}
