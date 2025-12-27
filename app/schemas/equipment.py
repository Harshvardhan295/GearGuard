from pydantic import BaseModel
from datetime import date
from typing import Optional


class EquipmentCategoryCreate(BaseModel):
    name: str


class EquipmentCategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class EquipmentCreate(BaseModel):
    name: str
    serial_number: str
    category_id: int
    department_id: int
    maintenance_team_id: int
    default_technician_id: int
    purchase_date: date
    warranty_end_date: date
    location: Optional[str] = None


class EquipmentResponse(BaseModel):
    id: int
    name: str
    serial_number: str
    is_scrapped: bool

    class Config:
        from_attributes = True
