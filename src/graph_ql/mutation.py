import strawberry
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from db.campaign_repository import CampaignRepository
from graph_ql.context import Context

from datetime import datetime
from uuid import uuid4
from graph_ql.types import Campaign
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
