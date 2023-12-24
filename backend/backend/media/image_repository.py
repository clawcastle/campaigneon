from datetime import datetime
from typing import List
import boto3
from uuid import uuid4, UUID
import os
from backend.db.models import EntryImage, EntryImageMetadata
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
                    INSERT INTO public.images (id, campaign_id, created_at, file_name)
                    VALUES ($1, $2, $3, $4)
                    """,
                    image_id,
                    campaign_id,
                    datetime.now(),
                    file_name,
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

    async def get_entry_images(self, entry_id: UUID) -> List[EntryImage]:
        image_metadata: List[EntryImageMetadata] = []

        async with await connection_pool.acquire() as conn:
            results = await conn.fetch(
                """
                SELECT id, campaign_id, created_at, file_name
                FROM images
                INNER JOIN entry_images ON "entry_id" = $1
                """,
                entry_id,
            )

            for result in results:
                image_metadata.append(
                    EntryImageMetadata(
                        image_id=result[0],
                        campaign_id=result[1],
                        entry_id=entry_id,
                        created_at=result[2],
                        file_name=result[3],
                    )
                )

        entry_images: List[EntryImage] = []

        for metadata in image_metadata:
            presigned_url = self.__s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.__bucket_name, "Key": metadata.file_name},
                ExpiresIn=60 * 60 * 24,
            )

            entry_images.append(
                EntryImage(
                    entry_id=entry_id, url=presigned_url, created_at=metadata.created_at
                )
            )

        return entry_images

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
