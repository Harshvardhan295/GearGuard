from sqlalchemy.orm import Session
from app.repositories.employee_repo import create_employee

def create_employee_service(db: Session, user_id: int, department_id: int):
    return create_employee(db, user_id, department_id)
