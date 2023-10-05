from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter
from uuid import UUID, uuid4
from typing import List

from db.campaign_repository import CampaignRepository

@strawberry.type
class Campaign:
    id: UUID
    title: str
    

@strawberry.type
class Query:
    @strawberry.field
    async def campaigns(self) -> List[Campaign]:
        campaigns = await CampaignRepository.get_campaigns(str(uuid4()))

        return campaigns
    

schema = strawberry.Schema(Query)

graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

@app.get("/hello_world")
def hello_world():
    return "hello world"

if __name__ == "__main__":
    load_dotenv()
    
    uvicorn.run(app, host="0.0.0.0", port=5000)