from sqlalchemy.orm import Session
from app.repositories.department_repo import create_department, list_departments

def create_department_service(db: Session, name: str):
    return create_department(db, name)

def list_departments_service(db: Session):
    return list_departments(db)
