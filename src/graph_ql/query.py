from typing import List

import strawberry
from db.campaign_repository import CampaignRepository
from graph_ql.types import Campaign
from uuid import uuid4


@strawberry.type
class Query:
    @strawberry.field
    async def campaigns(self) -> List[Campaign]:
        campaigns = await CampaignRepository.get_campaigns(uuid4())

        return campaigns
        