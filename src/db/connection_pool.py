import os
from typing import Optional
import aiopg

class ConnectionPool:
    def __init__(self) -> None:
        self.__pool: Optional[aiopg.Pool] = None

    async def acquire(self) -> aiopg.Connection:
        if self.__pool is None:
            connection_string = os.environ.get("DB_CONNECTION_STRING")
            self.__pool = await aiopg.create_pool(connection_string)
        
        return await self.__pool.acquire()
    
connection_pool = ConnectionPool()