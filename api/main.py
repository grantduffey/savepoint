from steam import Steam
from decouple import config

KEY = config("STEAM_API_KEY")

steam = Steam(KEY)

# arguments: steamid
user = steam.apps.get_app_details(105600, "metacritic")
print(user)

# 76561198045832474