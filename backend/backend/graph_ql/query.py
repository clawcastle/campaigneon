from typing import List, Optional
from uuid import UUID
from backend.db.job_repository import JobRepository
import strawberry
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from backend.media.image_repository import ImageRepository
from backend.db.campaign_repository import CampaignRepository
from backend.db.category_repository import CategoryRepository
from backend.db.entry_repository import EntryRepository
from backend.graph_ql.context import Context
from backend.graph_ql.types import (
    Campaign,
    Category,
    Entry,
    EntryImage,
    EntryMetadata,
    Job,
    JobStatus,
    PresignedUploadUrl,
)
from backend.db.job_repository import JobStatus as DbJobStatus

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

    @strawberry.field
    async def entry(self, entry_id: UUID) -> Entry:
        entry = await EntryRepository.get_entry(entry_id)

        return entry

    @strawberry.field
    async def entries_metadata(self, campaign_id: UUID) -> List[EntryMetadata]:
        entries_metadata = await EntryRepository.get_entries_metadata(campaign_id)

        return entries_metadata

    @strawberry.field
    async def entry_images(self, campaign_id: UUID, entry_id: UUID) -> List[EntryImage]:
        image_repository = (
            ImageRepository()
        )  # TODO: Set up dependency injection for repositories

        entry_images = await image_repository.get_entry_images(entry_id=entry_id)

        response = [
            EntryImage(url=entry_image.url, created_at=entry_image.created_at)
            for entry_image in entry_images
        ]

        return response

    @strawberry.field
    async def image_upload_url(self, campaign_id: UUID) -> PresignedUploadUrl:
        image_repository = (
            ImageRepository()
        )  # TODO: Set up dependency injection for repositories

        presigned_upload_url = image_repository.get_presigned_upload_url()

        return presigned_upload_url
    
    @strawberry.field
    async def jobs(self, campaign_id: UUID, job_id: UUID) -> Optional[Job]:
        job = await JobRepository.get_job(job_id=job_id)

        if job is None:
            return None
        
        job_status = None

        if job.job_status == DbJobStatus.IN_PROGRESS:
            job_status = JobStatus.IN_PROGRESS
        elif job.job_status == DbJobStatus.COMPLETED:
            job_status = JobStatus.COMPLETED
        else:
            job_status = JobStatus.ERROR
        
        return Job(id=job.id, status=job_status)
