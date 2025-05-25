import openai
import psycopg2
import numpy as np
from dotenv import load_dotenv
import os
from supabase import create_client, Client  # You were missing this import

# Load environment variables
load_dotenv()

# Configure API and database clients
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch user profiles
try:
    profiles = supabase.table("profiles").select("*").execute().data
except Exception as e:
    print(f"Error fetching profiles: {e}")
    profiles = []

# Function to generate embeddings
def get_user_embedding(profile):
    try:
        content = f"{profile.get('interests', '')} {profile.get('values', '')} {profile.get('lifestyle', '')} {profile.get('dating_intentions', '')}"
        response = openai.Embedding.create(
            input=content,
            model="text-embedding-ada-002"
        )
        return response['data'][0]['embedding']
    except Exception as e:
        print(f"Error generating embedding for profile {profile.get('id', 'unknown')}: {e}")
        return None

# Connect to Postgres
try:
    conn = psycopg2.connect(
        dbname=os.getenv("PG_DB"),
        user=os.getenv("PG_USER"),
        password=os.getenv("PG_PASSWORD"),
        host=os.getenv("PG_HOST")
    )
    cur = conn.cursor()

    for profile in profiles:
        emb = get_user_embedding(profile)
        if emb is not None:
            cur.execute("""
                INSERT INTO user_embeddings (user_id, embedding)
                VALUES (%s, %s)
                ON CONFLICT (user_id) DO UPDATE SET embedding = EXCLUDED.embedding;
            """, (profile['id'], emb))

    conn.commit()
    cur.close()
    conn.close()
    print("Embeddings successfully saved to database.")

except Exception as e:
    print(f"Database error: {e}")