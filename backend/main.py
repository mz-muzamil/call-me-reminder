from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.v1.endpoints import reminders
from app.services.scheduler import start_scheduler, scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    start_scheduler()
    yield
    # Shutdown
    scheduler.shutdown()

app = FastAPI(
    title="Call Me Reminder API",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(reminders.router, prefix="/reminders", tags=["reminders"])


# CORS Configuration
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}