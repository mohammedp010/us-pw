# backend/app/minio_client.py

from minio import Minio
import os

MINIO_ENDPOINT = "minio:9000"
MINIO_ACCESS_KEY = "minioadmin"
MINIO_SECRET_KEY = "minioadmin"
MINIO_BUCKET = "csvuploads"

client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=False,
)

found = client.bucket_exists(MINIO_BUCKET)
if not found:
    client.make_bucket(MINIO_BUCKET)

def download_csv(file_name: str, local_path: str = "/tmp/temp.csv") -> str:
    client.fget_object(MINIO_BUCKET, file_name, local_path)
    return local_path
