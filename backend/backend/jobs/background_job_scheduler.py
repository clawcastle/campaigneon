from backend.db.job_repository import Job, JobRepository
from fastapi import BackgroundTasks


class BackgroundJobScheduler:
    def __init__(self, job_repository: JobRepository) -> None:
        self.job_repository = job_repository

    async def schedule_job(self, job: Job, scheduler: BackgroundTasks) -> None:
        await self.job_repository.create_job(job=job)

        scheduler.add_task(job.execute)


        
