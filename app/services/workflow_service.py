from sqlalchemy.orm import Session
from app.models.maintenance_request import MaintenanceRequest

def change_request_stage_service(
    db: Session,
    request_id: int,
    stage_id: int
):
    request = db.get(MaintenanceRequest, request_id)
    if not request:
        raise ValueError("Request not found")

    request.stage_id = stage_id

    # Scrap automation
    if request.stage.name.lower() == "scrap":
        request.equipment.is_scrapped = True

    db.commit()
    return request
