from pydantic import BaseModel


class MaintenanceTeamCreate(BaseModel):
    name: str


class MaintenanceTeamResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class TeamMemberCreate(BaseModel):
    user_id: int
