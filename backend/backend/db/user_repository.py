from backend.db.models import User
from backend.db.connection_pool import connection_pool
from typing import List

class UserRepository:
    async def create_user(user: User) -> User:
        async with await connection_pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO users (id, email, created_at, display_name)
                VALUES ($1, $2, $3, $4)
                """,
                user.id,
                user.email,
                user.created_at,
                user.display_name
            )

            return user