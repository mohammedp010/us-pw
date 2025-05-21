from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import api
from app.models import Base
from app.database import engine

app = FastAPI()

# CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables if they don't exist
Base.metadata.create_all(bind=engine)

app.include_router(api.router)
