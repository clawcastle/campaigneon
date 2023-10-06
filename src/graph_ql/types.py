from uuid import UUID
from datetime import datetime

import strawberry


@strawberry.type
class Campaign:
    id: UUID
    title: str
    created_at: datetime
    created_by: str
