from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.department_service import (
    create_department_service,
    list_departments_service
)
from app.schemas.department import (
    DepartmentCreate,
    DepartmentResponse
)

router = APIRouter()

@router.post("/", response_model=DepartmentResponse)
def create_department(
    payload: DepartmentCreate,
    db: Session = Depends(get_db)
):
    return create_department_service(db, payload.name)

@router.get("/", response_model=list[DepartmentResponse])
def list_departments(db: Session = Depends(get_db)):
    return list_departments_service(db)
