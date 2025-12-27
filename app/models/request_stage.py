
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class RequestStage(Base):
    __tablename__ = "request_stages"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    sequence: Mapped[int] = mapped_column(Integer, nullable=False)
