import boto3
from uuid import uuid4
import os

class PresignedUploadUrlFields:
    def __init__(self, key: str, policy: str, date: str, credential: str, signature: str, algorithm: str) -> None:
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

    def get_presigned_upload_url(self, bucket_name: str, expires_in_seconds: int) -> PresignedUploadUrl:
        object_name = str(uuid4())

        presigned_url_response = self.__s3_client.generate_presigned_post(
            bucket_name,
            object_name,
            Fields=None,
            Conditions=None,
            ExpiresIn=expires_in_seconds,
        )

        response_fields = presigned_url_response["fields"]

        fields = PresignedUploadUrlFields(
            key=response_fields["key"],
            policy=response_fields["policy"],
            date=response_fields["x-amz-date"],
            credential=response_fields["x-amz-credential"],
            signature=response_fields["x-amz-signature"],
            algorithm=response_fields["x-amz-algorithm"]
        )

        presigned_upload_url = PresignedUploadUrl(url=presigned_url_response["url"], fields=fields)

        return presigned_upload_url
