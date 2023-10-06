from db.models import Campaign
from db.connection_pool import connection_pool
from typing import List


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
                SELECT "id", "title", created_at 
                FROM campaigns 
                INNER JOIN campaign_members ON "id" = campaign_id 
                WHERE user_id = $1
                """,
                user_id,
            )

            campaigns = [
                Campaign(result[0], result[1], result[2]) for result in results
            ]

            return campaigns
