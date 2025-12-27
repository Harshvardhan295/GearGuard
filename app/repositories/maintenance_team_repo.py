
from sqlalchemy.orm import Session
from app.models.maintenance_team import MaintenanceTeam, TeamMember

def create_team(db: Session, name: str) -> MaintenanceTeam:
    team = MaintenanceTeam(name=name)
    db.add(team)
    db.commit()
    db.refresh(team)
    return team

def add_team_member(db: Session, team_id: int, user_id: int):
    member = TeamMember(team_id=team_id, user_id=user_id)
    db.add(member)
    db.commit()
    return member
