# backend/app/models.py

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class PowerPlant(Base):
    __tablename__ = "power_plants"

    id = Column(Integer, primary_key=True, index=True)
    plant_name = Column(String)
    state = Column(String(length=2))
    net_generation_mwh = Column(Float)