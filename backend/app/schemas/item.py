from pydantic import BaseModel
from datetime import datetime

class ItemCreate(BaseModel):
    title: str
    description: str | None = None


class ItemUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    is_active: bool | None = None


class ItemOut(BaseModel):
    id: int
    title: str
    description: str | None = None
    is_done: bool
    owner_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
