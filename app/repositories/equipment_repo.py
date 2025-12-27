
from sqlalchemy.orm import Session
from app.models.equipment import Equipment, EquipmentCategory

def create_category(db: Session, name: str) -> EquipmentCategory:
    category = EquipmentCategory(name=name)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

def create_equipment(db: Session, data: dict) -> Equipment:
    equipment = Equipment(**data)
    db.add(equipment)
    db.commit()
    db.refresh(equipment)
    return equipment

def get_equipment(db: Session, equipment_id: int) -> Equipment | None:
    return db.get(Equipment, equipment_id)
