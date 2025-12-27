from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.workflow_service import (
    change_request_stage_service
)

router = APIRouter()

@router.patch("/{request_id}/stage")
def change_stage(
    request_id: int,
    stage_id: int,
    db: Session = Depends(get_db)
):
    try:
        return change_request_stage_service(db, request_id, stage_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
