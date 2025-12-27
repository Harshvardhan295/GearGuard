from sqlalchemy.orm import Session
from app.repositories.maintenance_request_repo import create_request
from app.repositories.request_stage_repo import get_stage_by_name
from app.models.equipment import Equipment

def create_maintenance_request_service(
    db: Session,
    payload,
    user_id: int
):
    equipment = db.get(Equipment, payload.equipment_id)
    if not equipment:
        raise ValueError("Equipment not found")

    stage = get_stage_by_name(db, "New")
    if not stage:
        raise ValueError("Default stage not configured")

    data = {
        "subject": payload.subject,
        "equipment_id": payload.equipment_id,
        "request_type_id": payload.request_type_id,
        "maintenance_team_id": equipment.maintenance_team_id,
        "stage_id": stage.id,
        "scheduled_date": payload.scheduled_date,
        "duration_hours": payload.duration_hours,
        "created_by": user_id,
    }

    return create_request(db, data)
