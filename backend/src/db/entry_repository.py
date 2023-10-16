from typing import List, Optional
from db.models import Entry, EntryMetadata
from db.connection_pool import connection_pool
from uuid import UUID
from datetime import datetime


class UpdateEntryModel:
    def __init__(
        self,
        entry_id: UUID,
        title: str,
        entry_text_rich: str,
        entry_text_raw: str,
        modified_at: datetime,
        modified_by: str,
        entry_text_summary: Optional[str],
    ) -> None:
        self.entry_id = entry_id
        self.title = title
        self.entry_text_rich = entry_text_rich
        self.entry_text_raw = entry_text_raw
        self.modified_at = modified_at
        self.modified_by: modified_by
        self.entry_text_summary = entry_text_summary


class EntryRepository:
    async def create_entry(entry: Entry) -> Entry:
        async with await connection_pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO entries (id, campaign_id, title, entry_text_rich, 
                entry_text_raw, entry_text_summary, created_at, last_modified_at, 
                created_by, last_modified_by, category_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
            )

            return entry

    async def get_entry(entry_id: UUID) -> Entry:
        async with await connection_pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                SELECT id, campaign_id, title, entry_text_rich, 
                entry_text_raw, entry_text_summary, created_at, last_modified_at, 
                created_by, last_modified_by, category_id
                FROM entries
                WHERE id = $1
                """,
                entry_id,
            )

            if result is None:
                return None

            entry = Entry(
                id=result[0],
                campaign_id=result[1],
                title=result[2],
                entry_text_rich=result[3],
                entry_text_raw=result[4],
                entry_text_summary=result[5],
                created_at=result[6],
                last_modified_at=result[7],
                created_by=result[8],
                last_modified_by=result[9],
                category_id=result[10],
            )

            return entry

    async def get_entries_metadata(campaign_id: UUID) -> List[EntryMetadata]:
        async with await connection_pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT id, campaign_id, title, created_at, created_by,
                last_modified_at, last_modified_by, category_id
                FROM entries
                WHERE campaign_id = $1
                """,
                campaign_id,
            )

            entries_metadata = [
                EntryMetadata(
                    result[0],
                    result[1],
                    result[2],
                    result[3],
                    result[4],
                    result[5],
                    result[6],
                    result[7],
                )
                for result in results
            ]

            return entries_metadata

    async def update_entry(update_model: UpdateEntryModel) -> Entry:
        async with await connection_pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                UPDATE entries
                SET title = $1, entry_text_rich = $2, entry_text_raw = $3, last_modified_at = $4, last_modified_by = $5, entry_text_summary = $6
                WHERE id = $7
                RETURNING id, campaign_id, title, entry_text_rich, entry_text_raw, entry_text_summary, created_at, last_modified_at, 
                created_by, last_modified_by, category_id
                """,
                update_model.title,
                update_model.entry_text_rich,
                update_model.entry_text_raw,
                update_model.modified_at,
                update_model.modified_by,
                update_model.entry_text_summary,
                update_model.entry_id,
            )

            entry = Entry(
                id=result[0],
                campaign_id=result[1],
                title=result[2],
                entry_text_rich=result[3],
                entry_text_raw=result[4],
                entry_text_summary=result[5],
                created_at=result[6],
                last_modified_at=result[7],
                created_by=result[8],
                last_modified_by=result[9],
                category_id=result[10],
            )

            return entry
