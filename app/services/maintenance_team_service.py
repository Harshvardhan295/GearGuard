from sqlalchemy.orm import Session
from app.repositories.maintenance_team_repo import create_team, add_team_member

def create_team_service(db: Session, name: str):
    return create_team(db, name)

def add_team_member_service(db: Session, team_id: int, user_id: int):
    return add_team_member(db, team_id, user_id)
