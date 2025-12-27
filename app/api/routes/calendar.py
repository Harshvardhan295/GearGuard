from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.scheduler_service import get_overdue_requests_service

router = APIRouter()

@router.get("/overdue")
def overdue_requests(db: Session = Depends(get_db)):
    return get_overdue_requests_service(db)
