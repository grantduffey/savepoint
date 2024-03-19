from pydantic import BaseModel

class UserSchema(BaseModel):
    email: str
    display_name: str
    password: str