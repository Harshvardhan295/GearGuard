
from sqlalchemy.orm import Session
from app.repositories.notification_repo import create_notification

def notify_user_service(db: Session, user_id: int, message: str):
    return create_notification(db, user_id, message)
