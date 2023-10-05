import os

CONNECTION_STRING = None

def init_db_config():
        host = os.environ.get("DB_HOST")
        user = os.environ.get("DB_USER")
        password = os.environ.get("DB_PASSWORD")
        name = os.environ.get("DB_NAME")

        CONNECTION_STRING = f"dbname={name} user={user} password={password} host={host}"

