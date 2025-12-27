from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.auth_service import register_user, login_user
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    try:
        return register_user(
            db,
            payload.full_name,
            payload.email,
            payload.password,
            payload.role
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    try:
        return login_user(db, email, password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
