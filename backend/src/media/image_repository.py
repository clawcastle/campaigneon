import boto3
from uuid import uuid4


class ImageRepository:
    def __init__(
        self, endpoint_url: str, access_key_id: str, secret_access_key: str
    ) -> None:
        self.__s3_client = boto3.client(
            service_name="s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            region_name="weur",
        )

    def get_upload_link(self, bucket_name: str, expires_in_seconds: int) -> str:
        object_name = str(uuid4())

        presigned_url = self.__s3_client.generate_presigned_post(
            bucket_name,
            object_name,
            Fields=None,
            Conditions=None,
            ExpiresIn=expires_in_seconds,
        )

        return presigned_url
