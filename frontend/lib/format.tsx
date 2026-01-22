import { formatDistanceToNowStrict } from "date-fns";

export function formatReminderDate(dateIso: string) {
  return new Date(dateIso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function getCountdownLabel(dateIso: string) {
  const date = new Date(dateIso);
  if (date.getTime() < Date.now()) return "Past due";
  return formatDistanceToNowStrict(date, { addSuffix: true });
}

export function maskPhone(phone: string) {
  if (phone.length <= 4) return phone;
  return `${phone.slice(0, 3)} •••• ${phone.slice(-2)}`;
}
