import { Reminder } from "@/lib/types";

const now = Date.now();

export const mockReminders: Reminder[] = [
  {
    id: "rem-001",
    title: "Client follow-up call",
    message: "Call Alex about the renewal timeline and next steps.",
    phoneNumber: "+14155552671",
    scheduledFor: new Date(now + 1000 * 60 * 45).toISOString(),
    timezone: "America/Los_Angeles",
    status: "scheduled"
  },
  {
    id: "rem-002",
    title: "Medication reminder",
    message: "Take two capsules with a full glass of water.",
    phoneNumber: "+447700900123",
    scheduledFor: new Date(now + 1000 * 60 * 60 * 5).toISOString(),
    timezone: "Europe/London",
    status: "scheduled"
  },
  {
    id: "rem-003",
    title: "Project standup",
    message: "Join the standup and share blockers.",
    phoneNumber: "+81312345678",
    scheduledFor: new Date(now - 1000 * 60 * 30).toISOString(),
    timezone: "Asia/Tokyo",
    status: "completed"
  },
  {
    id: "rem-004",
    title: "Billing update",
    message: "Notify finance of the card update from procurement.",
    phoneNumber: "+14155550999",
    scheduledFor: new Date(now - 1000 * 60 * 70).toISOString(),
    timezone: "America/Los_Angeles",
    status: "failed"
  }
];
