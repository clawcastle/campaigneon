
import asyncio
from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID
from backend.db.job_repository import JobRepository
from backend.graph_ql.types import Job, JobStatus
import strawberry
from backend.db.job_repository import JobStatus as DbJobStatus

@strawberry.type
class Subscription:
    @strawberry.subscription
    async def job_updates(self, job_id: UUID) -> Optional[Job]:
        timeout = datetime.now() + timedelta(seconds=60)

        while datetime.now() < timeout:
            job = await JobRepository.get_job(job_id=job_id)

            if job is None:
                return None

            if job.job_status == DbJobStatus.COMPLETED or job.job_status == DbJobStatus.ERROR:
                status = JobStatus.COMPLETED if job.job_status == DbJobStatus.COMPLETED else JobStatus.ERROR
                return Job(id=job.id, status=status)
            
            await asyncio.sleep(delay=2)

        return None