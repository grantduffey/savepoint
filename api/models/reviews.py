from pydantic import BaseModel

class ReviewSchema(BaseModel):
    user_id: str
    steam_id: int
    game_title: str
    game_img: str
    rating: float
    favorite: bool
    content: str