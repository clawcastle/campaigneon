import jwt
import os

from backend.auth.user import AuthenticatedUser


class TokenVerifier:
    def __init__(self) -> None:
        self.domain = os.environ.get("DOMAIN")
        self.audience = os.environ.get("API_AUDIENCE")
        self.algorithms = os.environ.get("ALGORITHMS")
        self.issuer = os.environ.get("ISSUER")

        jwks_url = f"https://{self.domain}/.well-known/jwks.json"
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    def verify(self, token: str) -> AuthenticatedUser:
        try:
            signing_key = self.jwks_client.get_signing_key_from_jwt(token).key

            payload = jwt.decode(
                token,
                signing_key,
                algorithms=self.algorithms,
                audience=self.audience,
                issuer=self.issuer,
            )

            if payload["sub"] is None:
                return None

            return AuthenticatedUser(payload["sub"])
        except Exception as error:
            print(error)

            return None
