from typing import List
from uuid import UUID
import strawberry
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from db.campaign_repository import CampaignRepository
from db.category_repository import CategoryRepository
from graph_ql.context import Context
from graph_ql.types import Campaign, Category

Info = _Info[Context, RootValueType]

# TODO: Map from db models to types defined in graph_ql types module.

@strawberry.type
class Query:
    @strawberry.field
    async def campaigns(self, info: Info) -> List[Campaign]:
        user = info.context.user

        campaigns = await CampaignRepository.get_campaigns(user.user_id)

        return campaigns
    
    @strawberry.field
    async def categories(self, campaign_id: UUID) -> List[Category]:
        categories = await CategoryRepository.get_categories(campaign_id)

        return categories
