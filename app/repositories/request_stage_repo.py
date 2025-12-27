
from sqlalchemy.orm import Session
from app.models.request_stage import RequestStage

def create_stage(db: Session, name: str, sequence: int) -> RequestStage:
    stage = RequestStage(name=name, sequence=sequence)
    db.add(stage)
    db.commit()
    db.refresh(stage)
    return stage

def get_stage_by_name(db: Session, name: str) -> RequestStage | None:
    return db.query(RequestStage).filter(RequestStage.name == name).first()
