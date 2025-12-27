
from sqlalchemy.orm import Session
from app.models.department import Department

DEFAULT_DEPARTMENTS = [
    {"name": "Operations"},
    {"name": "Maintenance"},
    {"name": "Administration"},
]

def seed_departments(db: Session):
    if db.query(Department).count() > 0:
        return

    for dept in DEFAULT_DEPARTMENTS:
        db.add(Department(**dept))

    db.commit()
    print("✅ Departments seeded")
