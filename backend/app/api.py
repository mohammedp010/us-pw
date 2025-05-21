# backend/app/api.py

from fastapi import APIRouter, Depends, Query, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from .database import SessionLocal
from .minio_client import download_csv
from app.minio_client import client, MINIO_BUCKET
from minio.error import S3Error
from .utils import parse_csv_and_normalize
from .models import PowerPlant, Base
import shutil
import os

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload")
def upload_csv(file_name: str, db: Session = Depends(get_db)):
    file_path = download_csv(file_name)
    plants = parse_csv_and_normalize(file_path)

    for plant in plants:
        db.add(plant)
    db.commit()

    return {"message": f"Successfully ingested {len(plants)} records."}

@router.get("/plants/top")
def get_top_plants(
    db: Session = Depends(get_db),
    top_n: int = Query(10, ge=1),
    state: str = Query(None)
):
    query = db.query(PowerPlant)
    if state:
        query = query.filter(PowerPlant.state == state.upper())
    results = query.order_by(PowerPlant.net_generation_mwh.desc()).limit(top_n).all()
    return results

@router.post("/upload-to-minio")
async def upload_to_minio(file: UploadFile = File(...)):
    try:
        # Save file temporarily
        temp_file_path = f"/tmp/{file.filename}"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Upload to MinIO
        client.fput_object(
            MINIO_BUCKET,
            file.filename,
            temp_file_path,
            content_type=file.content_type
        )

        os.remove(temp_file_path)
        return {"message": "File uploaded to MinIO"}

    except S3Error as e:
        raise HTTPException(status_code=500, detail=f"S3 error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload error: {str(e)}")