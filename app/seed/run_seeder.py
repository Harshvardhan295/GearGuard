from app.core.database import SessionLocal
from app.seed.seed_request_stages import seed_request_stages
from app.seed.seed_request_types import seed_request_types
from app.seed.seed_admin_user import seed_admin_user
from app.seed.seed_equipment_categories import seed_equipment_categories
from app.seed.seed_departments import seed_departments
from app.seed.seed_maintenance_teams import seed_maintenance_teams

def run():
    db = SessionLocal()
    try:
        seed_equipment_categories(db)
        seed_departments(db)
        seed_maintenance_teams(db)
        seed_request_stages(db)
        seed_request_types(db)
        seed_admin_user(db)
    finally:
        db.close()

if __name__ == "__main__":
    run()

