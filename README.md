
# 🏭 US Power Plants Net Generation Visualization

This is a full-stack, containerized application for ingesting, transforming, and visualizing annual net generation data of U.S. power plants. Built as part of an architecture-focused assignment, it supports CSV ingestion via S3-compatible object storage (MinIO), a FastAPI backend for data processing and API exposure, and a Vite/React frontend for interactive visualization.

---

## 📦 Monorepo Structure

```
.
├── backend       # FastAPI backend
├── frontend      # Vite + React frontend
├── docker        # Dockerfiles
├── GEN23.csv     # Sample EPA dataset (CSV)
└── docker-compose.yml
```

---

## 🚀 Features

- **CSV ingestion from MinIO (S3-compatible)**
- **Data transformation and storage in PostgreSQL**
- **REST API to query top N power plants by net generation, with filtering by state**
- **Web UI to select state and view data in a table/chart**
- **Fully containerized setup via Docker Compose**

---

## 🔧 Setup Instructions

### 🔁 Prerequisites

- Docker
- Docker Compose

### ▶️ Run Locally

```bash
# Clone the repo
git https://github.com/mohammedp010/us-pw.git

# Start the application
docker-compose up --build
```

> Visit:
- Frontend: [http://localhost:4173](http://localhost:4173)
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)
- MinIO Console: [http://localhost:9001](http://localhost:9001)  
  Login with: `minioadmin:minioadmin`

---

## 🌉 Architecture Overview

### Logical View

```
CSV -> MinIO -> FastAPI (extract/transform/load) -> PostgreSQL
                                     ↓
                              REST API (CRUD)
                                     ↓
                            React UI (Vite/Chart)
```

### Deployment View

- All services are containerized and orchestrated via `docker-compose`
- Health checks ensure proper service readiness (Postgres)

### Infra View

| Component  | Technology   |
|------------|--------------|
| API        | FastAPI      |
| Frontend   | React + Vite |
| DB         | PostgreSQL   |
| Object Storage | MinIO (S3 compatible) |
| Ingestion Tool | MinIO Client (`mc`) |

---

## 🧠 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/plants/top` | Get top N power plants |
| GET | `/plants/state/{state_code}` | Filter by U.S. state |

> Swagger available at `/docs`

---

## 🖼️ UI Features

- Select U.S. state from dropdown
- Input number of top power plants
- View results in sortable table or chart

---

## 🧠 Key Technology Choices

| Stack Part | Tech | Rationale |
|------------|------|-----------|
| Backend | FastAPI | Fast, modern, async-friendly |
| Frontend | Vite + React | Fast dev server, modern tooling |
| DB | PostgreSQL | Relational, reliable |
| Object Store | MinIO | S3-compatible, easy local setup |
| Docker | Compose v3.8 | Orchestrated development environment |

---

## 📂 Multiple CSV Support

The ingestion logic handles multiple CSV uploads via the MinIO bucket `csvuploads`. Ensure schema consistency with the EPA GEN23 CSV format.

---

## 📝 License & Attribution

This project was developed as part of a confidentialAIQ Architect assignment. Use and share responsibly.
