from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env

print(os.getenv("SUPABASE_URL"))