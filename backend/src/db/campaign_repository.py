from uuid import UUID
from db.models import Campaign
from db.connection_pool import connection_pool
from typing import List

class UpdateCampaignModel:
    def __init__(self, campaign_id: UUID, title: str) -> None:
        self.campaign_id = campaign_id
        self.title = title

class CampaignRepository:
    async def create_campaign(campaign: Campaign) -> Campaign:
        async with await connection_pool.acquire() as conn:
            async with conn.transaction():
                await conn.execute(
                    """INSERT INTO campaigns (id, title, created_at, created_by) VALUES ($1, $2, $3, $4)""",
                    campaign.id,
                    campaign.title,
                    campaign.created_at,
                    campaign.created_by,
                )

                await conn.execute(
                    """INSERT INTO campaign_members (campaign_id, user_id, is_dm) VALUES ($1, $2, $3)""",
                    campaign.id,
                    campaign.created_by,
                    True,
                )

                return campaign

    async def get_campaigns(user_id: str) -> List[Campaign]:
        async with await connection_pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT "id", "title", created_at, created_by
                FROM campaigns 
                INNER JOIN campaign_members ON "id" = campaign_id 
                WHERE user_id = $1
                """,
                user_id,
            )

            campaigns = [
                Campaign(result[0], result[1], result[2], result[3]) for result in results
            ]

            return campaigns
        
    async def update_campaign(update_model: UpdateCampaignModel) -> Campaign:
        async with await connection_pool.acquire() as conn:
            result = await conn.fetchrow(
                """
                UPDATE campaigns
                SET title = $1
                WHERE id = $2
                RETURNING id, title, created_at, created_by
                """,
                update_model.title,
                update_model.campaign_id
            )

            return Campaign(id=result[0], title=result[1], created_at=result[2], created_by=result[3])

