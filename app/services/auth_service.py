from sqlalchemy.orm import Session
from app.repositories.user_repo import get_user_by_email, create_user
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token

def register_user(db: Session, full_name: str, email: str, password: str, role):
    existing = get_user_by_email(db, email)
    if existing:
        raise ValueError("Email already registered")

    user = User(
        full_name=full_name,
        email=email,
        role=role
    )
    user.password = hash_password(password)

    return create_user(db, user)

def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password):
        raise ValueError("Invalid credentials")

    token = create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}
