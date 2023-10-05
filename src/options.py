from dotenv import load_dotenv
import os

DB_CONNECTION_STRING = None

def load_options():
    load_dotenv()
    DB_CONNECTION_STRING = os.environ.get("DB_CONNECTION_STRING")

