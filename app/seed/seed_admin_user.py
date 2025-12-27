from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.core.security import hash_password

def seed_admin_user(db: Session):
    admin_exists = db.query(User).filter(User.role == UserRole.admin).first()
    if admin_exists:
        return

    admin = User(
        full_name="System Admin",
        email="admin@gearguard.com",
        role=UserRole.admin,
    )
    admin.password = hash_password("admin123")

    db.add(admin)
    db.commit()
    print("✅ Admin user created (admin@gearguard.com / admin123)")
