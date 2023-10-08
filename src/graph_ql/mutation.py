from typing import Optional
import strawberry
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from db.campaign_repository import CampaignRepository
from graph_ql.context import Context

from datetime import datetime
from uuid import uuid4, UUID
from graph_ql.types import Campaign, Category, Entry
import db.models

Info = _Info[Context, RootValueType]


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_campaign(self, title: str, info: Info) -> Campaign:
        user = info.context.user

        campaign = db.models.Campaign(uuid4(), title, datetime.now(), user.user_id)

        created_campaign = await CampaignRepository.create_campaign(campaign)

        return created_campaign

    @strawberry.mutation
    async def create_category(self, campaign_id: UUID, title: str, parent_id: Optional[UUID]) -> Category:
        created_category = db.models.Category(uuid4(), campaign_id=campaign_id, title=title, created_at=datetime.now(), parent_id=parent_id)

        return created_category
    
    @strawberry.mutation
    async def create_entry(self, title: str, campaign_id: UUID, category_id: Optional[UUID], info: Info) -> Entry:
        user = info.context.user

        entry = db.models.Entry(uuid4(), campaign_id, title, "", "", datetime.now(), datetime.now(), user.user_id, user.user_id, None, category_id, None)

        # TODO: Save to database

        return entry