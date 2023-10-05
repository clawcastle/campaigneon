from db.models import Campaign
import aiopg

from db.connection_pool import connection_pool

class CampaignRepository:
    async def get_campaigns(user_id: str) -> list[Campaign]:
        async with await connection_pool.acquire() as conn:
            async with await conn.cursor() as cur:
                await cur.execute(
                    """
                SELECT "id", "title", created_at 
                FROM campaigns 
                INNER JOIN campaign_members ON "id" = campaign_id 
                WHERE user_id = %s
                """,
                    (user_id,),
                )
                results = await cur.fetchall()

                campaigns = [Campaign(result[0], result[1], result[2]) for result in results]

                return campaigns
