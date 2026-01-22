import { Reminder } from "@/lib/types";

export const reminders: Reminder[] = [
  {
    id: "r1",
    title: "Dr. Smith Appointment",
    message: "AI Voice Agent",
    phoneNumber: "+15551239889",
    scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    status: "scheduled"
  },
  {
    id: "r2",
    title: "Subscription Renewal",
    message: "Automated Call",
    phoneNumber: "+14155550999",
    scheduledFor: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: "r3",
    title: "Feedback Survey",
    message: "Customer Service",
    phoneNumber: "+4420123412",
    scheduledFor: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "failed"
  },
  {
    id: "r4",
    title: "Invoice Follow-up",
    message: "Sales Team",
    phoneNumber: "+16501230443",
    scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: "scheduled"
  }
];
