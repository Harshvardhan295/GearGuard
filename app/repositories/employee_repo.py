
from sqlalchemy.orm import Session
from app.models.employee import Employee

def create_employee(db: Session, user_id: int, department_id: int) -> Employee:
    employee = Employee(user_id=user_id, department_id=department_id)
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee
