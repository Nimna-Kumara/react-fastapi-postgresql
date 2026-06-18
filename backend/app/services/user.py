from sqlalchemy import select
from sqlalchemy.orm import Session
from schemas.user import UserCreate

from models.user import User
from core.security import hash_password


def get_user_by_email(email: str, db: Session) -> User | None:
    result = db.execute(select(User).where(User.email == email.lower()))
    return result.scalar_one_or_none()


def create_user(user: UserCreate, db: Session):
    user = User(
        email=user.email.lower(),
        username=user.username,
        name=user.name,
        hashed_password=hash_password(user.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user 
