from sqlalchemy.orm import Session
from app.models.request_stage import RequestStage

DEFAULT_STAGES = [
    {"name": "New", "sequence": 1},
    {"name": "In Progress", "sequence": 2},
    {"name": "Repaired", "sequence": 3},
    {"name": "Scrap", "sequence": 4},
]

def seed_request_stages(db: Session):
    existing = db.query(RequestStage).count()
    if existing > 0:
        return

    for stage in DEFAULT_STAGES:
        db.add(RequestStage(**stage))

    db.commit()
    print("✅ Request stages seeded")
