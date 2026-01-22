"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NewReminderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    phoneNumber: "",
    message: "",
    scheduledAt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.phoneNumber || !formData.message || !formData.scheduledAt) {
        toast.warning("Please fill in all required fields (phone, message, date)");
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/reminders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          phone_number: formData.phoneNumber,
          message: formData.message,
          scheduled_at: new Date(formData.scheduledAt).toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error("API Error details:", errData);
        throw new Error(`Failed to create reminder: ${JSON.stringify(errData)}`);
      }

      toast.success("Reminder scheduled successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error creating reminder:", error);
      toast.error("Error creating reminder. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Create Reminder</h2>
        <p className="text-sm text-muted-foreground">
          Schedule a call with a short message and delivery time.
        </p>
      </div>
      <Card className="p-6 shadow-elevated">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Reminder title</label>
            <Input
              name="title"
              placeholder="Dentist appointment"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone number</label>
            <Input
              name="phoneNumber"
              placeholder="+14155552671"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Reminder message</label>
            <textarea
              name="message"
              className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Hi! This is your reminder about..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date & time</label>
            <Input
              name="scheduledAt"
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Timezone</label>
            <Input value={Intl.DateTimeFormat().resolvedOptions().timeZone} readOnly />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              We will call the phone number and speak the reminder message.
            </p>
            <Button type="submit" disabled={loading}>
              {loading ? "Scheduling..." : "Schedule reminder"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
