import asyncio
import httpx
from datetime import datetime, timedelta
import sys

BASE_URL = "http://localhost:8000"

async def test_flow():
    async with httpx.AsyncClient(timeout=30.0) as client:
        # Check Health
        try:
            resp = await client.get(f"{BASE_URL}/health")
            resp.raise_for_status()
            print("Health check passed")
        except Exception as e:
            print(f"Health check failed: {e}")
            return

        # Create Reminder
        # Schedule for 15 seconds from now
        schedule_time = datetime.utcnow() + timedelta(seconds=15)
        payload = {
            "phone_number": "+1234567890",
            "message": "This is a test reminder from Antigravity",
            "scheduled_at": schedule_time.isoformat(),
            "timezone": "UTC"
        }
        
        print(f"Creating reminder scheduled for {schedule_time.isoformat()}...")
        resp = await client.post(f"{BASE_URL}/reminders/", json=payload)
        if resp.status_code != 201:
            print(f"Failed to create reminder: {resp.text}")
            return
        
        reminder = resp.json()
        reminder_id = reminder["id"]
        print(f"Reminder created with ID: {reminder_id}")
        
        # Wait for scheduler to pick it up (approx 30s poll interval + buffer)
        print("Waiting for scheduler (approx 45s)...")
        # We poll the status every 5 seconds
        for i in range(12):
            await asyncio.sleep(5)
            resp = await client.get(f"{BASE_URL}/reminders/{reminder_id}")
            current_status = resp.json()["status"]
            print(f"[{i*5}s] Status: {current_status}")
            
            if current_status in ["completed", "failed", "calling"]:
                print(f"Reminder processed! Final status: {current_status}")
                if current_status == "failed":
                    print("(Expected 'failed' if VAPI key is invalid, so logic worked)")
                break
        else:
            print("Timed out waiting for reminder processing.")

if __name__ == "__main__":
    asyncio.run(test_flow())
