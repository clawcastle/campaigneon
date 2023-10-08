from pydantic import BaseModel

class CreateUserRequest(BaseModel):
    id: str
    email: str
    display_name: str