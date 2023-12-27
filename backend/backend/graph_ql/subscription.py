
from uuid import UUID
import strawberry


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def job_updates(self, job_id: UUID) -> None:
        pass