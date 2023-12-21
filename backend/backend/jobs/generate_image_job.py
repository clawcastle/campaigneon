from uuid import UUID, uuid4
from backend.backend.db.entry_repository import EntryRepository
from backend.backend.llm.llm_service import LlmService
from backend.backend.media.image_repository import ImageRepository


class GenerateImageForEntryJob:
    def __init__(
        self,
        llm_service: LlmService,
        image_repository: ImageRepository,
        campaign_id: UUID,
        entry_id: UUID,
    ) -> None:
        self.job_identifier = uuid4()
        self.campaign_id = campaign_id
        self.entry_id = entry_id
        self.llm_service = llm_service
        self.image_repository = image_repository

    # Returns a job identifier
    def execute(self) -> UUID:
        pass


class GenerateImageForEntryJobFactory:
    def __init__(
        self,
        llm_service: LlmService,
        image_repository: ImageRepository,
    ) -> None:
        self.llm_service = llm_service
        self.image_repository = image_repository

    def create(self, campaign_id: UUID, entry_id: UUID) -> GenerateImageForEntryJob:
        return GenerateImageForEntryJob(
            llm_service=self.llm_service,
            image_repository=self.image_repository,
            campaign_id=campaign_id,
            entry_id=entry_id,
        )
