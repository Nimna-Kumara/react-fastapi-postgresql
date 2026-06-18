from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from schemas.user import UserCreate, UserResponse
from db.session import get_db
from services.user import get_user_by_email, create_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(user.email, db)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registerd")
    return create_user(user, db)


    