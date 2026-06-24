from fastapi import APIRouter,Depends, HTTPException, status
from sqlalchemy.orm import Session

from schemas.item import ItemOut, ItemCreate, ItemUpdate
from dependencies import get_db, get_current_user
from models.user import User
from services.item import get_items, create_item, get_item, update_item, deactivate_item

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=list[ItemOut])
def list_items(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) 
):
    return get_items(db, current_user.id)


@router.post("/", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
def create(
    data: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_item(db, data, current_user.id)


@router.patch("/{item_id}", response_model=ItemOut)
def update(
    item_id: int,
    data: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = get_item(db, item_id, current_user.id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return update_item(db, item, data)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(
    item_id: int,
    db: Session = Depends(get_db),
    current_user:User = Depends(get_current_user) 
):
    item = get_item(db, item_id, current_user.id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    deactivate_item(db, item)