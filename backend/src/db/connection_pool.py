import os
from typing import Optional
import asyncpg


class ConnectionPool:
    def __init__(self) -> None:
        self.__pool: Optional[asyncpg.Pool] = None

    async def acquire(self):
        if self.__pool is None:
            connection_string = os.environ.get("DB_CONNECTION_STRING")
            self.__pool = await asyncpg.create_pool(connection_string)

        return self.__pool.acquire()


connection_pool = ConnectionPool()
