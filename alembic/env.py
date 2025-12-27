
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
import sys

# Add app to PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), "app")))

from app.core.database import Base
from app.core.config import settings

# Import ALL models so Alembic can detect them
from app.models.user import User
from app.models.department import Department
from app.models.employee import Employee
from app.models.maintenance_team import MaintenanceTeam, TeamMember
from app.models.equipment import Equipment, EquipmentCategory
from app.models.request_stage import RequestStage
from app.models.maintenance_request import MaintenanceRequest, RequestType
from app.models.notification import Notification
from app.models.activity_log import ActivityLog

config = context.config
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(
        url=settings.DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
