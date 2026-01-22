# Call Me Reminder Backend

A production-grade FastAPI backend for the "Call Me Reminder" application. This system schedules reminders and triggers outbound phone calls using Vapi.

## Tech Stack

- **Language**: Python 3.13
- **Framework**: FastAPI (Async)
- **Database**: SQLite (Async with `aiosqlite`) + SQLAlchemy 2.0
- **Migrations**: Alembic
- **Task Scheduling**: APScheduler (`AsyncIOScheduler`)
- **Integration**: Vapi (Outbound Calls)

## Features

- **Schedule Reminders**: Create reminders with a future date/time.
- **Idempotency**: Prevents duplicate reminders (basic logic implemented).
- **Background Worker**: Polling scheduler (every 30s) triggers due reminders.
- **Status Tracking**: Tracks reminder state (`scheduled` -> `calling` -> `completed` / `failed`).
- **Vapi Integration**: Triggers phone calls with a custom message.

## Prerequisites

- Python 3.9+
- A Vapi.ai account (Private Key + Phone Number ID)

## Setup

1. **Clone the repository** (if applicable)

2. **Create a Virtual Environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to add your `VAPI_PRIVATE_KEY` and `VAPI_PHONE_NUMBER`.*

5. **Initialize Database**
   Run the migrations to create the SQLite database:
   ```bash
   alembic upgrade head
   ```

## Running the Application

Start the server using `uvicorn`:

```bash
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

### API Documentation
Interactive API docs (Swagger UI) are available at:
- **http://127.0.0.1:8000/docs**

## Usage

### Create a Reminder
```bash
curl -X POST "http://127.0.0.1:8000/reminders/" \
     -H "Content-Type: application/json" \
     -d '{
           "phone_number": "+1234567890",
           "message": "Time to take your medicine",
           "scheduled_at": "2026-01-23T10:00:00",
           "timezone": "UTC"
         }'
```

### Check Status
```bash
curl "http://127.0.0.1:8000/reminders/{reminder_id}"
```

## Verification

A verification script is included to test the full flow (Create -> Wait -> Call Trigger):

```bash
python3 verify.py
```
*Note: Ensure the server is running on the port specified in `verify.py` (default 8001 during verification steps).*

## Project Structure
```
.
├── app
│   ├── api/v1/endpoints  # API Routes
│   ├── core              # Config & Database
│   ├── models            # SQLAlchemy Models
│   ├── schemas           # Pydantic Models
│   └── services          # Business Logic (Vapi, Scheduler)
├── alembic               # Migration scripts
├── main.py               # Application Entrypoint
├── verify.py             # E2E Test Script
└── requirements.txt      # Dependencies
```
