
# app/models/__init__.py

# Force model registration order
from app.models.user import User
from app.models.department import Department
from app.models.employee import Employee
from app.models.maintenance_team import MaintenanceTeam, TeamMember
from app.models.equipment import Equipment, EquipmentCategory
from app.models.maintenance_request import MaintenanceRequest
from app.models.request_stage import RequestStage
from app.models.notification import Notification
from app.models.activity_log import ActivityLog

__all__ = [
    "User",
    "Department",
    "Employee",
    "MaintenanceTeam",
    "TeamMember",
    "Equipment",
    "EquipmentCategory",
    "MaintenanceRequest",
    "RequestStage",
    "Notification",
    "ActivityLog",
]
