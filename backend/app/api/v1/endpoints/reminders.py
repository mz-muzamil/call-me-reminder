from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.reminder import Reminder, ReminderStatus
from app.schemas.reminder import ReminderCreate, ReminderResponse, ReminderUpdate

router = APIRouter()

@router.post("/", response_model=ReminderResponse, status_code=status.HTTP_201_CREATED)
async def create_reminder(
    reminder_in: ReminderCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new reminder.
    """
    # Simple duplicate check for Idempotency logic (e.g. same phone + time + message)
    # Ideally should use an Idempotency-Key header, but strictly schema based:
    query = select(Reminder).where(
        Reminder.phone_number == reminder_in.phone_number,
        Reminder.scheduled_at == reminder_in.scheduled_at,
        Reminder.message == reminder_in.message
    )
    result = await db.execute(query)
    existing = result.scalars().first()
    if existing:
         # Return existing instead of creating duplicate or 409
         return existing

    new_reminder = Reminder(**reminder_in.model_dump())
    db.add(new_reminder)
    await db.commit()
    await db.refresh(new_reminder)
    return new_reminder

@router.get("/", response_model=List[ReminderResponse])
async def list_reminders(
    skip: int = 0,
    limit: int = 100,
    status: Optional[ReminderStatus] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    List reminders with filtering and pagination.
    """
    query = select(Reminder).order_by(Reminder.scheduled_at.asc())
    
    if status:
        query = query.where(Reminder.status == status)
    
    if search:
        query = query.where(Reminder.message.ilike(f"%{search}%"))
        
    query = query.offset(skip).limit(limit)
    
    result = await db.execute(query)
    reminders = result.scalars().all()
    return reminders

@router.get("/{id}", response_model=ReminderResponse)
async def get_reminder(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    reminder = await db.get(Reminder, id)
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    return reminder

@router.patch("/{id}", response_model=ReminderResponse)
async def update_reminder(
    id: str,
    reminder_in: ReminderUpdate,
    db: AsyncSession = Depends(get_db)
):
    reminder = await db.get(Reminder, id)
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
        
    update_data = reminder_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(reminder, field, value)
        
    await db.commit()
    await db.refresh(reminder)
    return reminder

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_reminder(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    reminder = await db.get(Reminder, id)
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
        
    await db.delete(reminder)
    await db.commit()
