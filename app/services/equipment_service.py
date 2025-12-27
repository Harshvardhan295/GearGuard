from sqlalchemy.orm import Session
from app.repositories.equipment_repo import create_equipment, get_equipment

def create_equipment_service(db: Session, data: dict):
    return create_equipment(db, data)

def get_equipment_service(db: Session, equipment_id: int):
    equipment = get_equipment(db, equipment_id)
    if not equipment:
        raise ValueError("Equipment not found")
    return equipment
