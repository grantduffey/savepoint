from fastapi import FastAPI, status
from steam import Steam
from decouple import config
from supabase import create_client, Client

from models.games import GameSchema
from models.reviews import ReviewSchema
from models.users import UserSchema

url = config("SUPABASE_URL")
supa_key = config("SUPABASE_KEY")
steam_key = config("STEAM_API_KEY")

app = FastAPI()
supabase: Client = create_client(url, supa_key)
steam = Steam(steam_key)

@app.post("/users/add")
def add_user(user: UserSchema):
    user = supabase.auth.sign_up({
        "email": user.email,
        # "display_name": user.display_name,
        "password": user.password,
    })
    return user

@app.get("/games")
def get_games():
    games = supabase.table("games").select("*").execute()
    return games


# Do I need to just populate this table entirely from the steam library so its already there for the user, 
# or do I just create it when a user asks for it??
@app.post("/games/add", status_code=status.HTTP_201_CREATED)
def add_review(game: GameSchema):
    game = supabase.table("games").insert({
        "name": game.name,
        "steam_id": game.steam_id,
        "avg_rating": game.avg_rating,
        "steam_attrs": game.steam_attrs,
    }).execute()
    return game

@app.get("/reviews")
def get_reviews():
    reviews = supabase.table("reviews").select("*").execute()
    return reviews

@app.post("/reviews/add", status_code=status.HTTP_201_CREATED)
def add_review(review: ReviewSchema):
    review = supabase.table("reviews").insert({
        "game_id": review.game_id,
        "user_id": review.user_id,
        "rating": review.rating,
        "favorite": review.favorite,
        "content": review.content
    }).execute()
    return review