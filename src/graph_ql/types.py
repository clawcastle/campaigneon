from uuid import UUID
from typing import List
from datetime import datetime

import strawberry

@strawberry.type
class Campaign:
    id: UUID
    title: str
    created_at: datetime
