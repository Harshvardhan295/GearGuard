from sqlalchemy.orm import Session
from datetime import date
from app.models.maintenance_request import MaintenanceRequest

def get_overdue_requests_service(db: Session):
    today = date.today()
    return (
        db.query(MaintenanceRequest)
        .filter(
            MaintenanceRequest.scheduled_date < today
        )
        .all()
    )
