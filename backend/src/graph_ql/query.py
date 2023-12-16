from typing import List
from uuid import UUID
import strawberry
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from backend.src.media.image_repository import ImageRepository
from db.campaign_repository import CampaignRepository
from db.category_repository import CategoryRepository
from db.entry_repository import EntryRepository
from graph_ql.context import Context
from graph_ql.types import Campaign, Category, Entry, EntryMetadata, ImageUploadData

Info = _Info[Context, RootValueType]

# TODO: Map from db models to types defined in graph_ql types module.

image_repository = ImageRepository(
    endpoint_url="", access_key_id="", secret_access_key=""
)


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

    @strawberry.field
    async def entry(self, entry_id: UUID) -> Entry:
        entry = await EntryRepository.get_entry(entry_id)

        return entry

    @strawberry.field
    async def entries_metadata(self, campaign_id: UUID) -> List[EntryMetadata]:
        entries_metadata = await EntryRepository.get_entries_metadata(campaign_id)

        return entries_metadata

    @strawberry.field
    async def image_upload_url(self, campaign_id: UUID) -> ImageUploadData:
        presigned_url = image_repository.get_upload_link(
            bucket_name="campaigneon-dev", expires_in_seconds=300
        )

        return ImageUploadData(campaign_id=campaign_id, url=presigned_url)
