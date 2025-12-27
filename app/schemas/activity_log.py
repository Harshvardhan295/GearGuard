from pydantic import BaseModel
from datetime import datetime


class ActivityLogResponse(BaseModel):
    id: int
    entity_type: str
    entity_id: int
    action: str
    performed_by: int
    created_at: datetime

    class Config:
        from_attributes = True
