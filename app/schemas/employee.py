from pydantic import BaseModel


class EmployeeCreate(BaseModel):
    user_id: int
    department_id: int


class EmployeeResponse(BaseModel):
    id: int
    user_id: int
    department_id: int

    class Config:
        from_attributes = True
