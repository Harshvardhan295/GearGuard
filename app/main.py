
from fastapi import FastAPI
from app.api.routes import (
    auth,
    equipment,
    maintenance_requests,
    departments,
    employees,
    maintenance_teams,
    workflow,
    notifications,
    calendar,
)

app = FastAPI(
    title="GearGuard API",
    version="1.0.0"
)

# 🔐 Auth
app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["Auth"]
)

# ⚙️ Core Modules
app.include_router(
    equipment.router,
    prefix="/api/v1/equipment",
    tags=["Equipment"]
)

app.include_router(
    maintenance_requests.router,
    prefix="/api/v1/maintenance-requests",
    tags=["Maintenance Requests"]
)

app.include_router(
    departments.router,
    prefix="/api/v1/departments",
    tags=["Departments"]
)

app.include_router(
    employees.router,
    prefix="/api/v1/employees",
    tags=["Employees"]
)

app.include_router(
    maintenance_teams.router,
    prefix="/api/v1/maintenance-teams",
    tags=["Maintenance Teams"]
)

app.include_router(
    workflow.router,
    prefix="/api/v1/workflow",
    tags=["Workflow"]
)

app.include_router(
    notifications.router,
    prefix="/api/v1/notifications",
    tags=["Notifications"]
)

app.include_router(
    calendar.router,
    prefix="/api/v1/calendar",
    tags=["Calendar"]
)

@app.get("/")
def health():
    return {"status": "running"}
