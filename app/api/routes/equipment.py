from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.equipment_service import (
    create_equipment_service,
    get_equipment_service
)
from app.schemas.equipment import (
    EquipmentCreate,
    EquipmentResponse
)

router = APIRouter()

@router.post("/", response_model=EquipmentResponse)
def create_equipment(
    payload: EquipmentCreate,
    db: Session = Depends(get_db)
):
    return create_equipment_service(db, payload.dict())

@router.get("/{equipment_id}", response_model=EquipmentResponse)
def get_equipment(
    equipment_id: int,
    db: Session = Depends(get_db)
):
    try:
        return get_equipment_service(db, equipment_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
