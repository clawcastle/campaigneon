from functools import cached_property
from typing import Optional

from strawberry.fastapi import BaseContext

from auth.token_verifier import TokenVerifier
from auth.user import AuthenticatedUser


class Context(BaseContext):
    @cached_property
    def user(self) -> Optional[AuthenticatedUser]:
        if not self.request:
            return None

        authorization_header = self.request.headers.get("Authorization", None)

        if authorization_header is None:
            return None

        token_verifier = TokenVerifier()

        return token_verifier.verify(authorization_header.replace("Bearer ", ""))


async def get_context() -> Context:
    return Context()
