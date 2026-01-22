# Call Me Reminder App

This repository contains the full stack application for the Call Me Reminder project, featuring a Next.js frontend and a FastAPI backend.

## Project Structure

- **frontend/**: Next.js application (Dashboard & UI)
- **backend/**: FastAPI application (API, Scheduler, Vapi Integration)

---

## Frontend

The frontend is a Next.js application that provides the dashboard UI and reminder creation forms.

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)

### Run the app (step by step)

1) **Install frontend dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2) **Start the development server**:

   ```bash
   npm run dev
   ```

3) **Open the app in your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000)

### Features

- View the dashboard UI (mock reminders).
- Open the create reminder form at `/reminders/new`.
- Submit the form and check the browser console for the payload.

### Notes

- Tailwind CSS is configured in `frontend/tailwind.config.ts`.
- UI components live in `frontend/components`.
- Data is mocked in `frontend/lib/mockReminders.ts`.

---

## Backend

A production-grade FastAPI backend that schedules reminders and triggers outbound phone calls using Vapi.

### Tech Stack

- **Language**: Python 3.13
- **Framework**: FastAPI (Async)
- **Database**: SQLite (Async with `aiosqlite`) + SQLAlchemy 2.0
- **Migrations**: Alembic
- **Task Scheduling**: APScheduler (`AsyncIOScheduler`)
- **Integration**: Vapi (Outbound Calls)

### Features

- **Schedule Reminders**: Create reminders with a future date/time.
- **Idempotency**: Prevents duplicate reminders.
- **Background Worker**: Polling scheduler (every 30s) triggers due reminders.
- **Status Tracking**: Tracks reminder state (`scheduled` -> `calling` -> `completed` / `failed`).
- **Vapi Integration**: Triggers phone calls with a custom message.

### Background Job

The backend includes an automatic background scheduler (using `APScheduler`) that starts when the application launches. 

- **Function**: Polls the database every 30 seconds for reminders that are due (`scheduled_at` <= now) and in the `scheduled` state.
- **Action**: Triggers a phone call via Vapi for each due reminder and updates its status.
- **Verification**: You can verify the job is running by checking the server logs for the message: `Polling for due reminders...`


### Prerequisites

- Python 3.9+
- A Vapi.ai account (Private Key + Phone Number ID)

### Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

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

### Running the Application

Start the server using `uvicorn`:

```bash
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

#### API Documentation
Interactive API docs (Swagger UI) are available at:
- **http://127.0.0.1:8000/docs**

### Usage

#### Create a Reminder
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

#### Check Status
```bash
curl "http://127.0.0.1:8000/reminders/{reminder_id}"
```

### Verification

A verification script is included to test the full flow (Create -> Wait -> Call Trigger):

```bash
python3 verify.py
```
*Note: Ensure the server is running on the port specified in `verify.py` (default 8001 during verification steps).*
