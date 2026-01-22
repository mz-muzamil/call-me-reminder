import asyncio
import logging
from datetime import datetime
from sqlalchemy import select, update, and_
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.core.database import AsyncSessionLocal
from app.models.reminder import Reminder, ReminderStatus
from app.services.vapi import trigger_call

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()

async def process_due_reminders():
    """
    Polls for due reminders and triggers calls.
    """
    logger.info("Polling for due reminders...")
    async with AsyncSessionLocal() as session:
        now = datetime.utcnow()
        
        # 1. Fetch due reminders that are in 'scheduled' state
        # We need to lock them or mark them as calling immediately to prevent race conditions.
        # SQLite doesn't support FOR UPDATE SKIP LOCKED well, so we will try to update status first.
        # A robust way in SQLite without proper locking is to find candidates, try to update their status 
        # to 'calling' atomically, and only process those that were successfully updated.
        
        # Find candidates
        stmt = select(Reminder.id).where(
            and_(
                Reminder.status == ReminderStatus.SCHEDULED,
                Reminder.scheduled_at <= now
            )
        )
        result = await session.execute(stmt)
        candidate_ids = result.scalars().all()
        
        if not candidate_ids:
            return

        logger.info(f"Found {len(candidate_ids)} due reminders.")

        for reminder_id in candidate_ids:
            # Try to acquire lock by updating status atomically
            # strict check: status must STILL be scheduled
            update_stmt = (
                update(Reminder)
                .where(and_(Reminder.id == reminder_id, Reminder.status == ReminderStatus.SCHEDULED))
                .values(status=ReminderStatus.CALLING)
                .execution_options(synchronize_session=False)
            )
            result = await session.execute(update_stmt)
            await session.commit()
            
            if result.rowcount == 1:
                # We successfully acquired this reminder
                # Send to background task or process immediately
                # For simplicity here, we process await-fully (or create a task)
                asyncio.create_task(execute_reminder_call(reminder_id))

async def execute_reminder_call(reminder_id: str):
    logger.info(f"Executing reminder {reminder_id}")
    async with AsyncSessionLocal() as session:
        reminder = await session.get(Reminder, reminder_id)
        if not reminder:
            return

        try:
            # Trigger Call
            await trigger_call(reminder.phone_number, reminder.message)
            
            # Update status to completed
            reminder.status = ReminderStatus.COMPLETED
        except Exception as e:
            logger.error(f"Error processing reminder {reminder_id}: {e}")
            reminder.status = ReminderStatus.FAILED
        
        await session.commit()

def start_scheduler():
    scheduler.add_job(process_due_reminders, 'interval', seconds=30)
    scheduler.start()
