from pydantic import BaseModel

class GameSchema(BaseModel):
    name: str
    steam_id: int
    avg_rating: float
    steam_attrs: str