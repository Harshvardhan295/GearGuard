
from datetime import date
import enum

from sqlalchemy import String, Date, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class RequestType(enum.Enum):
    PREVENTIVE = "preventive"
    CORRECTIVE = "corrective"
    EMERGENCY = "emergency"


class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"

    id: Mapped[int] = mapped_column(primary_key=True)

    equipment_id: Mapped[int] = mapped_column(
        ForeignKey("equipment.id"), nullable=False
    )

    request_type: Mapped[RequestType] = mapped_column(
        Enum(RequestType), nullable=False
    )

    description: Mapped[str] = mapped_column(String(500), nullable=False)

    scheduled_date: Mapped[date | None] = mapped_column(Date, nullable=True)

    created_by_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    equipment: Mapped["Equipment"] = relationship(
        "Equipment",
        back_populates="maintenance_requests",
    )

    created_by: Mapped["User"] = relationship(
        "User",
        back_populates="maintenance_requests",
    )
