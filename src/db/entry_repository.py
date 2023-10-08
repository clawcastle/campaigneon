from db.models import Category, Entry
from db.connection_pool import connection_pool
from typing import List
from uuid import UUID

class EntryRepository:
    async def create_entry(entry: Entry) -> Entry:
        async with await connection_pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO entries (id, campaign_id, title, entry_text_rich, 
                entry_text_raw, entry_text_summary, created_at, last_modified_at, 
                created_by, last_modified_by, category_id, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                """,
                entry.id, 
                entry.campaign_id, 
                entry.title, 
                entry.entry_text_rich, 
                entry.entry_text_raw, 
                entry.entry_text_summary, 
                entry.created_at, 
                entry.last_modified_at, 
                entry.created_by, 
                entry.last_modified_by, 
                entry.category_id, 
                entry.image_url
            )

            return entry
