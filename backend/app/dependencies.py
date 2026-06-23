from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from fastapi.security import OAuth2PasswordBearer
from core.security import decode_access_token
from db.session import get_db
from models.user import User
from services.user import get_user_by_id


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    user_id = decode_access_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    
    user = get_user_by_id(user_id, db)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user
    