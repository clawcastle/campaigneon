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