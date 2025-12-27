
from sqlalchemy.orm import Session
from app.models.activity_log import ActivityLog

def log_activity(
    db: Session,
    entity_type: str,
    entity_id: int,
    action: str,
    performed_by: int
):
    log = ActivityLog(
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        performed_by=performed_by
    )
    db.add(log)
    db.commit()
    return log
