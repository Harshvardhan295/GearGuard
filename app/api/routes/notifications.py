from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.repositories.notification_repo import list_notifications
from app.schemas.notification import NotificationResponse

router = APIRouter()

@router.get("/", response_model=list[NotificationResponse])
def get_notifications(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return list_notifications(db, current_user.id)
