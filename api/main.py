# from typing import Annotated
from fastapi import FastAPI, status, HTTPException, Depends, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
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
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


origins = [
    "http://localhost:*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def default_route():
    return {"detail": "Root Route"}

@app.post("/register")
def register(request: UserSchema):
    request = supabase.auth.sign_up({
        "email": request.email,
        "password": request.password,
        "options": {
            "data": {
                "display_name": request.display_name,
            }
        }
    })
    return request

@app.post("/login")
def login(request: UserSchema, response: Response):
    try:
        auth_user = supabase.auth.sign_in_with_password(
            {"email": request.email,  "password": request.password})
        return auth_user
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

# def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     user = supabase.auth.get_user()
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid email or password",
#         )
#     return user

@app.post("/logout")
def logout():
    response = supabase.auth.sign_out()
    return "success"

@app.post("/refresh")
async def refresh_token(request: Request):
    data = await request.json()
    token = data.get('refresh_token')

    session = supabase.auth.refresh_session(token)
    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session",
        )
    return session

# def check_game():
    

@app.get("/reviews")
def get_all_reviews():
    reviews = supabase.table("reviews").select("*").execute()
    return reviews

@app.get("/reviews/{steam_id}")
def get_all_game_reviews(steam_id: int):
    game_reviews = supabase.table("reviews").select("*").eq("steam_id", str(steam_id)).execute()
    return game_reviews

@app.get("/reviews/{steam_id}/{user_id}")
def get_user_game_reviews(steam_id: int, user_id: str):
    user_game_reviews = supabase.table("reviews").select("*").eq("steam_id", str(steam_id)).eq("user_id", user_id).execute()
    return user_game_reviews

@app.get('/reviews/{steam_id}/{user_id}/{review_id}')
def get_one_review(steam_id: int, user_id: str, review_id: int):
    review = supabase.table("reviews").select("*").eq("steam_id", str(steam_id)).eq("user_id", user_id).eq("id", review_id).execute()
    return review

# @app.put('/reviews/{steam_id}/{user_id}/{review_id}/update')
# def update_review(steam_id: int, user_id: str, review_id: int, review: ReviewSchema):
#     new_review = "asdasd"
#     return new_review


@app.post("/reviews/add", status_code=status.HTTP_201_CREATED)
def add_review(review: ReviewSchema):
    # Check to see if the user_id and steam_id are valid
    user = supabase.auth.get_user()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User must be signed in",
        )
    game = steam.apps.search_games(str(review.steam_id))
    if not game["apps"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Game does not exist on Steam",
        )
    # Post the review
    review = supabase.table("reviews").insert({
        "steam_id": review.steam_id, 
        "user_id": review.user_id,
        "rating": review.rating,
        "favorite": review.favorite,
        "content": review.content
    }).execute()
    return review

# @app.get("/games")
# def get_all_games():
#     games = supabase.table("games").select("*").execute()
#     return games

# @app.get("/games/{id}")
# def get_game(id: int):
#     game = supabase.table("games").select("*").eq("steam_id", id).execute()
#     return game

# # Add a check to see if the database alreay has a game
# @app.post("/games/add", status_code=status.HTTP_201_CREATED)
# def add_game(game: GameSchema):
#     response = get_game(game.steam_id)
#     if response.count is None:
#         game = supabase.table("games").insert({
#             "name": game.name,
#             "steam_id": game.steam_id,
#             "avg_rating": game.avg_rating,
#             "steam_attrs": game.steam_attrs,
#         }).execute()
#         return game
#     else:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Game already exists in the database"
#         )

# test = steam.apps.search_games("0")
# if not test["apps"]:
#     print("EMPTY ARRAY")
