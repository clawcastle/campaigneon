from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter
from graph_ql.context import get_context
from graph_ql.mutation import Mutation

from graph_ql.query import Query

schema = strawberry.Schema(Query, Mutation)

graphql_app = GraphQLRouter(schema, context_getter=get_context)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    load_dotenv()

    uvicorn.run(app, host="0.0.0.0", port=5000)
