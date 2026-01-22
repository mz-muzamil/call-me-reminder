import asyncio
import httpx
from datetime import datetime, timedelta
import random

BASE_URL = "http://localhost:8002"

async def create_reminder(client, i):
    try:
        schedule_time = datetime.utcnow() + timedelta(seconds=random.randint(5, 60))
        payload = {
            "phone_number": f"+1234567890",
            "message": f"Test reminder {i}",
            "scheduled_at": schedule_time.isoformat(),
            "timezone": "UTC"
        }
        resp = await client.post(f"{BASE_URL}/reminders/", json=payload, timeout=5.0)
        print(f"[{i}] Create Status: {resp.status_code}")
    except Exception as e:
        print(f"[{i}] Create Failed: {repr(e)}")

async def list_reminders(client, i):
    try:
        resp = await client.get(f"{BASE_URL}/reminders/", timeout=5.0)
        print(f"[{i}] List Status: {resp.status_code}")
    except Exception as e:
        print(f"[{i}] List Failed: {repr(e)}")

async def main():
    async with httpx.AsyncClient() as client:
        tasks = []
        for i in range(20):
            if i % 2 == 0:
                tasks.append(create_reminder(client, i))
            else:
                tasks.append(list_reminders(client, i))
            await asyncio.sleep(0.1)
        
        await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())
