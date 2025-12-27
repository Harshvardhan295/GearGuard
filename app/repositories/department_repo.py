
from sqlalchemy.orm import Session
from app.models.department import Department

def create_department(db: Session, name: str) -> Department:
    department = Department(name=name)
    db.add(department)
    db.commit()
    db.refresh(department)
    return department

def list_departments(db: Session):
    return db.query(Department).all()
