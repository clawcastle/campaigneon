from datetime import datetime
from backend.db.models import User
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter
from backend.auth.requests import CreateUserRequest
from backend.db.user_repository import UserRepository
from backend.graph_ql.context import get_context
from backend.graph_ql.mutation import Mutation
from backend.graph_ql.query import Query

schema = strawberry.Schema(Query, Mutation)

graphql_app = GraphQLRouter(schema, context_getter=get_context)

app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:3000"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")

@app.post("/users")
async def user_registered_callback(request: CreateUserRequest):
    user = User(request.id, request.display_name, request.email, datetime.now())

    await UserRepository.create_user(user)


if __name__ == "__main__":
    load_dotenv()

    uvicorn.run(app, host="0.0.0.0", port=5000)
