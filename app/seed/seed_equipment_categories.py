
from sqlalchemy.orm import Session
from app.models.equipment import EquipmentCategory

DEFAULT_CATEGORIES = [
    {"name": "Generator"},
    {"name": "Pump"},
    {"name": "Compressor"},
]

def seed_equipment_categories(db: Session):
    if db.query(EquipmentCategory).count() > 0:
        return

    for item in DEFAULT_CATEGORIES:
        db.add(EquipmentCategory(**item))

    db.commit()
    print("✅ Equipment categories seeded")
