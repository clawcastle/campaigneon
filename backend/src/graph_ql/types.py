from typing import Optional
from uuid import UUID
from datetime import datetime

import strawberry


@strawberry.type
class Campaign:
    id: UUID
    title: str
    created_at: datetime
    created_by: str


@strawberry.type
class Category:
    id: UUID
    campaign_id: UUID
    title: str
    created_at: datetime
    parent_id: Optional[UUID]


@strawberry.type
class Entry:
    id: UUID
    campaign_id: str
    title: str
    entry_text_rich: str
    entry_text_raw: str
    created_at: datetime
    last_modified_at: datetime
    created_by: str
    last_modified_by: str
    entry_text_summary: Optional[str]
    category_id: Optional[str]


@strawberry.type
class EntryMetadata:
    id: UUID
    campaign_id: str
    title: str
    created_at: datetime
    last_modified_at: datetime
    created_by: str
    last_modified_by: str
    category_id: Optional[str]


@strawberry.type
class ImageUploadData:
    campaign_id: UUID
    url: str
