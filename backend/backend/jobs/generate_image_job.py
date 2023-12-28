from datetime import datetime
from uuid import UUID, uuid4

import requests
from backend.db.entry_repository import EntryRepository
from backend.db.job_repository import (
    Job,
    JobRepository,
    JobStatus,
    JobType,
    UpdateJobModel,
)
from backend.llm.llm_service import LlmService
from backend.media.image_repository import ImageRepository


class GenerateImageForEntryJob(Job):
    def __init__(
        self,
        llm_service: LlmService,
        image_repository: ImageRepository,
        campaign_id: UUID,
        entry_id: UUID,
    ) -> None:
        self.id = uuid4()
        self.job_type = JobType.GENERATE_IMAGE
        self.job_status = JobStatus.IN_PROGRESS
        self.created_at = datetime.now()
        self.campaign_id = campaign_id
        self.entry_id = entry_id
        self.llm_service = llm_service
        self.image_repository = image_repository
        self.metadata = {
            "campaign_id": str(self.campaign_id),
            "entry_id": str(self.entry_id),
        }

    # Returns a job identifier
    async def execute(self) -> None:
        # save status of job to db as "in progress"
        # generate prompt
        # generate image
        # upload image
        # update job status to "completed", add metadata about uploaded image

        try:
            entry = await EntryRepository.get_entry(entry_id=self.entry_id)

            generate_image_prompt = self.llm_service.generate_entry_image_generation_prompt(entry=entry, art_styles=["fantasy", "medieval", "painting", "realistic"])

            generate_image_response = self.llm_service.generate_image(prompt=generate_image_prompt)

            image_data_response = requests.get(generate_image_response.url)

            image_data = image_data_response.content

            image_id = uuid4()

            await self.image_repository.save_image(
                campaign_id=self.campaign_id,
                entry_id=self.entry_id,
                image_id=image_id,
                image_data=image_data,
            )

            self.metadata["image_id"] = str(image_id)
            self.metadata["prompt"] = generate_image_prompt

            update_job_model = UpdateJobModel(
                job_id=self.id,
                job_status=JobStatus.COMPLETED,
                metadata=self.metadata,
            )

            await JobRepository.update_job(update_model=update_job_model)

        except Exception as e:
            self.metadata["error"] = str(e)

            update_job_model = UpdateJobModel(
                job_id=self.id,
                job_status=JobStatus.ERROR,
                metadata=self.metadata,
            )

            await JobRepository.update_job(update_model=update_job_model)


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
