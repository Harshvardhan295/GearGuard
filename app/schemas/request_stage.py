from pydantic import BaseModel


class RequestStageCreate(BaseModel):
    name: str
    sequence: int


class RequestStageResponse(BaseModel):
    id: int
    name: str
    sequence: int

    class Config:
        from_attributes = True
