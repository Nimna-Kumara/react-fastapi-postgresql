from sqlalchemy import select
from sqlalchemy.orm import Session
from models.item import Item
from schemas.item import ItemCreate, ItemUpdate

def get_items(db: Session, owner_id: int) -> list[Item]:
    result = db.execute(
        select(Item).where(Item.owner_id == owner_id, Item.is_active.is_(True))
        .order_by(Item.created_at.desc())
    )
    return list(result.scalars().all())

def get_item(db: Session, item_id: int, owner_id: int) -> Item | None:
    result = db.execute(
        select(Item).where(
            Item.id == item_id,
            Item.owner_id == owner_id,
            Item.is_active.is_(True)
        )
    )
    return result.scalar_one_or_none()

def create_item(db: Session, data: ItemCreate, owner_id: int) -> Item:
    item = Item(**data.model_dump(), owner_id = owner_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_item(db: Session, item: Item, data: ItemUpdate) -> Item:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item

def deactivate_item(db: Session, item: Item) -> None:
    item.is_active = False
    db.commit()
    db.refresh(item)
    