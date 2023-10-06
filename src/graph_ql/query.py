from typing import List

import strawberry
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from db.campaign_repository import CampaignRepository
from graph_ql.context import Context
from graph_ql.types import Campaign

Info = _Info[Context, RootValueType]


@strawberry.type
class Query:
    @strawberry.field
    async def campaigns(self, info: Info) -> List[Campaign]:
        user = info.context.user

        campaigns = await CampaignRepository.get_campaigns(user.user_id)

        return campaigns
