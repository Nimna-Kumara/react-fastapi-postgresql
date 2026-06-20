from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserCreate(UserBase):
    username: str
    
class UserResponse(BaseModel):
    email: EmailStr
    username: str
    name: str
