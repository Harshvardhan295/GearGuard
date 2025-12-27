
from datetime import date
from sqlalchemy import String, Date, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class EquipmentCategory(Base):
    __tablename__ = "equipment_categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    equipment: Mapped[list["Equipment"]] = relationship(
        "Equipment",
        back_populates="category",
    )


class Equipment(Base):
    __tablename__ = "equipment"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(150), nullable=False)
    serial_number: Mapped[str] = mapped_column(
        String(100), unique=True, index=True
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("equipment_categories.id"), nullable=False
    )
    department_id: Mapped[int] = mapped_column(
        ForeignKey("departments.id"), nullable=False
    )
    assigned_employee_id: Mapped[int | None] = mapped_column(
        ForeignKey("employees.id"), nullable=True
    )
    maintenance_team_id: Mapped[int] = mapped_column(
        ForeignKey("maintenance_teams.id"), nullable=False
    )
    default_technician_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    purchase_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    warranty_end_date: Mapped[date | None] = mapped_column(Date, nullable=True)

    location: Mapped[str | None] = mapped_column(String(150), nullable=True)
    is_scrapped: Mapped[bool] = mapped_column(Boolean, default=False)

    category: Mapped["EquipmentCategory"] = relationship(
        "EquipmentCategory",
        back_populates="equipment",
    )

    department: Mapped["Department"] = relationship(
        "Department",
        back_populates="equipment",
    )

    assigned_employee: Mapped["Employee"] = relationship(
        "Employee",
        back_populates="equipment",
    )

    maintenance_team: Mapped["MaintenanceTeam"] = relationship(
        "MaintenanceTeam",
        back_populates="equipment",
    )

    # REQUIRED back_populates for User.assigned_equipment
    default_technician: Mapped["User"] = relationship(
        "User",
        back_populates="assigned_equipment",
        foreign_keys=[default_technician_id],
    )

    # REQUIRED back_populates for MaintenanceRequest.equipment
    maintenance_requests: Mapped[list["MaintenanceRequest"]] = relationship(
        "MaintenanceRequest",
        back_populates="equipment",
        cascade="all, delete-orphan",
    )
