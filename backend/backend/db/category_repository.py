from backend.db.models import Category
from backend.db.connection_pool import connection_pool
from typing import List
from uuid import UUID


class CategoryRepository:
    async def create_category(category: Category) -> Category:
        async with await connection_pool.acquire() as conn:
            await conn.execute(
                """
            INSERT INTO categories (id, campaign_id, title, created_at, parent_id)
            VALUES ($1, $2, $3, $4, $5)
            """,
                category.id,
                category.campaign_id,
                category.title,
                category.created_at,
                category.parent_id,
            )

            return category

    async def get_categories(campaign_id: UUID) -> List[Category]:
        async with await connection_pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT id, title, created_at, parent_id
                FROM categories
                WHERE campaign_id = $1
                """,
                campaign_id
            )

            return [
                Category(result[0], campaign_id, result[1], result[2], result[3])
                for result in results
            ]
