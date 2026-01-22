import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{6,14}$/;

export const reminderSchema = z.object({
  title: z.string().min(2, "Title is required"),
  message: z.string().min(4, "Message is required"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Enter a valid phone number in E.164 format"),
  scheduledFor: z
    .string()
    .refine((value) => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) && date.getTime() > Date.now();
    }, "Date & time must be in the future"),
  timezone: z.string().min(1)
});

export type ReminderFormValues = z.infer<typeof reminderSchema>;
