import enum
import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Enum, Text
from sqlalchemy.dialects.sqlite import JSON
from app.core.database import Base

class ReminderStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    CALLING = "calling"
    COMPLETED = "completed"
    FAILED = "failed"

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    phone_number = Column(String, nullable=False)
    scheduled_at = Column(DateTime(timezone=True), nullable=False)
    timezone = Column(String, default="UTC")
    status = Column(Enum(ReminderStatus), default=ReminderStatus.SCHEDULED)
    user_id = Column(String, nullable=True) # Multitenancy placeholder
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
