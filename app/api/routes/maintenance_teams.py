from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.maintenance_team_service import (
    create_team_service,
    add_team_member_service
)
from app.schemas.maintenance_team import (
    MaintenanceTeamCreate,
    MaintenanceTeamResponse,
    TeamMemberCreate
)

router = APIRouter()

@router.post("/", response_model=MaintenanceTeamResponse)
def create_team(
    payload: MaintenanceTeamCreate,
    db: Session = Depends(get_db)
):
    return create_team_service(db, payload.name)

@router.post("/{team_id}/members")
def add_member(
    team_id: int,
    payload: TeamMemberCreate,
    db: Session = Depends(get_db)
):
    return add_team_member_service(db, team_id, payload.user_id)
