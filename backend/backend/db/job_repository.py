from __future__ import annotations

from abc import abstractmethod
from datetime import datetime
from uuid import UUID
from enum import Enum
import json
from typing import Dict, Any, Optional
from backend.db.connection_pool import connection_pool


class JobType(str, Enum):
    GENERATE_IMAGE = "GENERATE_IMAGE"

    @staticmethod
    def from_str(s: str) -> JobType:
        if s == "GENERATE_IMAGE":
            return JobType.GENERATE_IMAGE
        else:
            raise Exception(f"Invalid string value for JobType: {s}")


class JobStatus(str, Enum):
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    ERROR = "ERROR"

    @staticmethod
    def from_str(s: str) -> JobStatus:
        if s == "IN_PROGRESS":
            return JobStatus.IN_PROGRESS
        elif s == "COMPLETED":
            return JobStatus.COMPLETED
        elif s == "ERROR":
            return JobStatus.ERROR
        else:
            raise Exception(f"Invalid string value for JobStatus: {s}")

class Job:
    def __init__(
        self,
        id: UUID,
        job_type: JobType,
        job_status: JobStatus,
        created_at: datetime,
        metadata: Dict[str, Any],
    ) -> None:
        self.id = id
        self.job_type = job_type
        self.job_status = job_status
        self.created_at = created_at
        self.metadata = metadata

    @abstractmethod
    async def execute(self) -> None:
        pass


class UpdateJobModel:
    def __init__(
        self, job_id: UUID, job_status: JobStatus, metadata: Dict[str, Any]
    ) -> None:
        self.job_id = job_id
        self.job_status = job_status
        self.metadata = metadata


class JobRepository:
    @staticmethod
    async def create_job(job: Job) -> Job:
        metadata_json = json.dumps(job.metadata)

        async with await connection_pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO jobs (id, job_type, job_status, created_at, metadata)
                VALUES ($1, $2, $3, $4, $5)
                """,
                job.id,
                job.job_type,
                job.job_status,
                job.created_at,
                metadata_json,
            )

        return job

    @staticmethod
    async def update_job(update_model: UpdateJobModel) -> Job:
        metadata_json = json.dumps(update_model.metadata)

        async with await connection_pool.acquire() as conn:
            await conn.execute(
                """
                UPDATE jobs
                SET job_status = $1, metadata = $2
                WHERE id = $3
                """,
                update_model.job_status,
                metadata_json,
                update_model.job_id,
            )

    @staticmethod
    async def get_job(job_id: UUID) -> Optional[Job]:
        async with await connection_pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                SELECT id, job_type, job_status, created_at, metadata
                FROM jobs
                WHERE id = $1
                """,
                job_id
            )

            if result is None:
                return None
            
            job_type = JobType.from_str(result[1])
            job_status = JobStatus.from_str(result[2])
            job_metadata = json.loads(result[4])

            return Job(id=result[0], job_type=job_type, job_status=job_status, created_at=result[3], metadata=job_metadata)


