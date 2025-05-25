# import psycopg2
# import numpy as np
# from dotenv import load_dotenv
# import os

# #load env variables
# load_dotenv()

# # Connect to Postgres
# conn = psycopg2.connect(
#     dbname = os.getenv("PG_DB"),
#     user = os.getenv("PG_USER"),
#     password = os.getenv("PG_PASSWORD"),
#     host = os.getenv("PG_HOST")
# )

# cur = conn.cursor()
# class MatchMaker:
#     def
# def find_similar_users(user_id, top_n = 5):
#     """
#     Find the top N similar users based on cosine similarity of their embbedings.
    
#     """
#     # Step 1: Fetch embedding for this user
#     cur.execute("SELECT embedding FROM user_embeddings WHERE user_id = %s", (user_id,))
#     result = cur.fetchone()
#     if not result:
#         print("No embedding found for this user.")
#         return []
    
#     user_embedding = result[0]

#     # Step 2: Search for similar users using cosine distance
#     cur.execute("""
#         SELECT user_id, embedding <#> %s::vector as distance FROM user_embeddings WHERE user_id != %s ORDER BY distance ASC LIMIT %s""",

#         (user_embedding, user_id, top_n))
    
#     matches = cur.fetchall()
#     for match in matches:
#         print(f"User {match[0]} - Distance: {match[1]}")
#     return matches

# # if __name__ == "__main__":
# #     user_id = "64405eea-150f-40e0-bbb1-6efe579857e4"
# #     find_similar_users(user_id)

# cur.close()
# conn.close()