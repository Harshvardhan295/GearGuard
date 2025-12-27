
from sqlalchemy.orm import Session
from app.models.maintenance_request import RequestType

DEFAULT_REQUEST_TYPES = [
    RequestType.PREVENTIVE,
    RequestType.CORRECTIVE,
    RequestType.EMERGENCY,
]

def seed_request_types(db: Session):
    # enums are static — nothing to seed into DB
    print("✅ Request types available:", [t.value for t in DEFAULT_REQUEST_TYPES])
