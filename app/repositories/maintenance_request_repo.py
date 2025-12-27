
from sqlalchemy.orm import Session
from app.models.maintenance_request import MaintenanceRequest


def create_request(db: Session, data: dict) -> MaintenanceRequest:
    obj = MaintenanceRequest(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_request(db: Session, request_id: int) -> MaintenanceRequest | None:
    return db.get(MaintenanceRequest, request_id)


def list_requests(db: Session) -> list[MaintenanceRequest]:
    return db.query(MaintenanceRequest).all()
