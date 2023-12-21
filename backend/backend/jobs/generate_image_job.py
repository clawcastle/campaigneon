from uuid import UUID, uuid4

import requests
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
    async def execute(self) -> None:
        # save status of job to db as "in progress"
        # generate prompt
        # generate image
        # upload image
        # update job status to "completed", add metadata about uploaded image to couple the two

        # TODO: Add way of saving job status

        entry = await EntryRepository.get_entry(entry_id=self.entry_id)

        # TODO: Generate prompt from entry description

        generate_image_response = self.llm_service.generate_image(prompt="TODO")

        image_data_response = requests.get(generate_image_response.url)

        image_data = image_data_response.content

        file_name = str(uuid4())
        self.image_repository.save_image(
            campaign_id=self.campaign_id,
            entry_id=self.entry_id,
            file_name=file_name,
            image_data=image_data,
        )


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
