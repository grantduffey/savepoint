from pydantic import BaseModel

class ReviewSchema(BaseModel):
    game_id: int
    user_id: str
    rating: float
    favorite: bool
    content: str