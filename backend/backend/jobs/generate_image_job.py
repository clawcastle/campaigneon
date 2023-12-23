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
        # update job status to "completed", add metadata about uploaded image

        job_model = self.to_db_model()
        await JobRepository.create_job(job_model)

        try:
            entry = await EntryRepository.get_entry(entry_id=self.entry_id)

            prompt = "TODO"  # TODO: Generate prompt from entry description

            generate_image_response = self.llm_service.generate_image(prompt=prompt)

            image_data_response = requests.get(generate_image_response.url)

            image_data = image_data_response.content

            image_id = uuid4()

            self.image_repository.save_image(
                campaign_id=self.campaign_id,
                entry_id=self.entry_id,
                image_id=image_id,
                image_data=image_data,
            )

            job_model.metadata["image_id"] = image_id
            job_model.metadata["prompt"] = prompt

            update_job_model = UpdateJobModel(
                job_id=self.job_identifier,
                job_status=JobStatus.COMPLETED,
                metadata=job_model.metadata,
            )

            await JobRepository.update_job(update_model=update_job_model)

        except Exception as e:
            job_model.metadata["error"] = str(e)

            update_job_model = UpdateJobModel(
                job_id=self.job_identifier,
                job_status=JobStatus.ERROR,
                metadata=job_model.metadata,
            )

            await JobRepository.update_job(update_model=update_job_model)

    def to_db_model(self) -> Job:
        metadata = {"campaign_id": self.campaign_id, "entry_id": self.entry_id}

        return Job(
            self.job_identifier,
            JobType.GENERATE_IMAGE,
            JobStatus.IN_PROGRESS,
            datetime.now(),
            metadata,
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
