
from datetime import datetime
import enum
from sqlalchemy import String, Enum, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class UserRole(enum.Enum):
    admin = "admin"
    manager = "manager"
    technician = "technician"
    employee = "employee"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    full_name: Mapped[str] = mapped_column(
        String(100), nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(150), unique=True, index=True, nullable=False
    )

    # 🔐 REQUIRED FOR AUTH
    password: Mapped[str] = mapped_column(
        String(255), nullable=False
    )

    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole), nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )

    # Relationships
    employee: Mapped["Employee"] = relationship(
        "Employee",
        back_populates="user",
        uselist=False,
    )

    maintenance_requests: Mapped[list["MaintenanceRequest"]] = relationship(
        "MaintenanceRequest",
        back_populates="created_by",
        cascade="all, delete-orphan",
    )

    assigned_equipment: Mapped[list["Equipment"]] = relationship(
        "Equipment",
        back_populates="default_technician",
        foreign_keys="Equipment.default_technician_id",
    )
