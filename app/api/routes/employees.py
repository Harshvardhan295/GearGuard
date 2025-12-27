from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.employee_service import create_employee_service
from app.schemas.employee import EmployeeCreate, EmployeeResponse

router = APIRouter()

@router.post("/", response_model=EmployeeResponse)
def create_employee(
    payload: EmployeeCreate,
    db: Session = Depends(get_db)
):
    return create_employee_service(
        db,
        payload.user_id,
        payload.department_id
    )
