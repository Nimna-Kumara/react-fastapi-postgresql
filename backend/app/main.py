from fastapi import FastAPI

from routers.auth import router as auth_router
from db.database import Base, engine

app = FastAPI(
    title="react-fastapi-postgresql-app",
    version="1.0.0"
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(auth_router)