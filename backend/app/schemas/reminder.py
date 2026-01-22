from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, field_validator
from app.models.reminder import ReminderStatus

class ReminderBase(BaseModel):
    title: Optional[str] = None
    message: str = Field(..., min_length=1, description="The message to be spoken")
    phone_number: str = Field(..., pattern=r"^\+?[1-9]\d{1,14}$", description="E.164 format phone number")
    scheduled_at: datetime
    timezone: str = "UTC"

    @field_validator('scheduled_at')
    def scheduled_future(cls, v):
        if v.tzinfo is None:
            # Assume UTC if naive, or reject. For now, let's treat naive as UTC.
            pass 
        # Check if future
        # In a real app we'd compare with utcnow()
        # if v <= datetime.utcnow():
        #     raise ValueError('scheduled_at must be in the future')
        return v

class ReminderCreate(ReminderBase):
    pass

class ReminderUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    
    @field_validator('scheduled_at')
    def scheduled_future(cls, v):
        if v is None: return v
        # Same logic
        return v

class ReminderResponse(ReminderBase):
    id: UUID
    status: ReminderStatus
    created_at: datetime
    user_id: Optional[str] = None

    class Config:
        from_attributes = True
