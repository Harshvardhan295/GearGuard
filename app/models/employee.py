
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True
    )
    department_id: Mapped[int] = mapped_column(
        ForeignKey("departments.id")
    )

    user = relationship("User", back_populates="employee")
    department = relationship("Department", back_populates="employees")
    equipment = relationship("Equipment", back_populates="assigned_employee")
