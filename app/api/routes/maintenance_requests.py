from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.schemas.maintenance_request import (
    MaintenanceRequestCreate,
    MaintenanceRequestResponse
)
from app.services.maintenance_request_service import (
    create_maintenance_request_service
)

router = APIRouter()

@router.post("/", response_model=MaintenanceRequestResponse)
def create_request(
    payload: MaintenanceRequestCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        return create_maintenance_request_service(
            db,
            payload,
            current_user.id
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
