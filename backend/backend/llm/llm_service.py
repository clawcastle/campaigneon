import os
import requests


class GenerateImageResponse:
    def __init__(self, created_at: int, url: str) -> None:
        self.created_at = created_at
        self.url = url


class LlmService:
    def __init__(self) -> None:
        self.__api_key = os.environ.get("OPENAI_API_KEY")

    def generate_image(self, prompt: str) -> GenerateImageResponse:
        request_body = {
            "model": "dall-e-3",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024",
        }
        response = requests.post(
            url="https://api.openai.com/v1/images/generations",
            data=request_body,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.__api_key}",
            },
        )

        response_content = response.json()

        return GenerateImageResponse(
            created_at=response_content["created"],
            url=response_content["data"][0]["url"],
        )
