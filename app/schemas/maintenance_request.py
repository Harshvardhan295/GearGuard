from pydantic import BaseModel
from typing import Optional
from datetime import date


class MaintenanceRequestCreate(BaseModel):
    subject: str
    equipment_id: int
    request_type_id: int
    scheduled_date: Optional[date] = None
    duration_hours: Optional[float] = None


class MaintenanceRequestResponse(BaseModel):
    id: int
    subject: str
    equipment_id: int
    stage_id: int

    class Config:
        from_attributes = True
    