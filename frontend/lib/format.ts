import { differenceInMinutes, formatDistanceToNowStrict } from "date-fns";

export function formatReminderDate(dateIso: string) {
  return new Date(dateIso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function getCountdownLabel(dateIso: string) {
  const minutes = differenceInMinutes(new Date(dateIso), new Date());
  if (minutes <= 0) return "Due now";
  return formatDistanceToNowStrict(new Date(dateIso), { addSuffix: true });
}

export function maskPhone(phone: string) {
  if (phone.length <= 4) return phone;
  return `${phone.slice(0, 3)} •••• ${phone.slice(-2)}`;
}
