from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter

from db.campaign_repository import CampaignRepository
from graph_ql.query import Query

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