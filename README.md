# Call Reminder App

This repo currently includes the frontend UI for the Call Me Reminder test project.
The dashboard uses mock data and the create form logs a payload to the browser console.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)

## Run the app (step by step)

1) Install frontend dependencies:

```
cd frontend
npm install
```

2) Start the development server:

```
npm run dev
```

3) Open the app in your browser:

```
http://localhost:3000
```

## What you can do now

- View the dashboard UI (mock reminders).
- Open the create reminder form at `/reminders/new`.
- Submit the form and check the browser console for the payload.

## Notes

- Tailwind CSS is configured in `frontend/tailwind.config.ts`.
- UI components live in `frontend/components`.
- Data is mocked in `frontend/lib/mockReminders.ts`.
