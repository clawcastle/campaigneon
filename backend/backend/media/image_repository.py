from datetime import datetime
import boto3
from uuid import uuid4, UUID
import os

from backend.db.connection_pool import connection_pool


class PresignedUploadUrlFields:
    def __init__(
        self,
        key: str,
        policy: str,
        date: str,
        credential: str,
        signature: str,
        algorithm: str,
    ) -> None:
        self.key = key
        self.policy = policy
        self.date = date
        self.credential = credential
        self.signature = signature
        self.algorithm = algorithm


class PresignedUploadUrl:
    def __init__(self, url: str, fields: PresignedUploadUrlFields) -> None:
        self.url = url
        self.fields = fields


class ImageRepository:
    def __init__(self) -> None:
        self.__bucket_name = os.environ.get("S3_BUCKET_NAME")
        self.__presigned_upload_url_expiry_seconds = int(
            os.environ.get("S3_PRESIGNED_UPLOAD_URL_EXPIRY_SECONDS")
        )

        endpoint_url = os.environ.get("S3_ENDPOINT_URL")
        access_key_id = os.environ.get("S3_ACCESS_KEY_ID")
        secret_access_key = os.environ.get("S3_SECRET_ACCESS_KEY")

        self.__s3_client = boto3.client(
            service_name="s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            region_name="weur",
        )

    async def save_image(
        self, campaign_id: str, entry_id: str, image_id: UUID, image_data: bytes
    ) -> str:
        file_name = f"{campaign_id}/{entry_id}/{image_id}"

        response = self.__s3_client.put_object(
            Body=image_data,
            Bucket=self.__bucket_name,
            Key=file_name,
            ContentType="image/jpg",
        )

        async with await connection_pool.acquire() as conn:
            async with conn.transaction():
                await conn.execute(
                    """
                    INSERT INTO public.images (id, campaign_id, created_at)
                    VALUES ($1, $2, $3)
                    """,
                    image_id,
                    campaign_id,
                    datetime.now(),
                )

                await conn.execute(
                    """
                    INSERT INTO entry_images (entry_id, image_id)
                    VALUES ($1, $2)
                    """,
                    entry_id,
                    image_id,
                )

        return file_name

    def get_presigned_upload_url(self) -> PresignedUploadUrl:
        object_name = str(uuid4())

        presigned_url_response = self.__s3_client.generate_presigned_post(
            self.__bucket_name,
            object_name,
            Fields=None,
            Conditions=None,
            ExpiresIn=self.__presigned_upload_url_expiry_seconds,
        )

        response_fields = presigned_url_response["fields"]

        fields = PresignedUploadUrlFields(
            key=response_fields["key"],
            policy=response_fields["policy"],
            date=response_fields["x-amz-date"],
            credential=response_fields["x-amz-credential"],
            signature=response_fields["x-amz-signature"],
            algorithm=response_fields["x-amz-algorithm"],
        )

        presigned_upload_url = PresignedUploadUrl(
            url=presigned_url_response["url"], fields=fields
        )

        return presigned_upload_url
