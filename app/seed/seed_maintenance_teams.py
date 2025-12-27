
from sqlalchemy.orm import Session
from app.models.maintenance_team import MaintenanceTeam

DEFAULT_TEAMS = [
    {"name": "Default Maintenance Team"},
]

def seed_maintenance_teams(db: Session):
    if db.query(MaintenanceTeam).count() > 0:
        return

    for team in DEFAULT_TEAMS:
        db.add(MaintenanceTeam(**team))

    db.commit()
    print("✅ Maintenance teams seeded")
