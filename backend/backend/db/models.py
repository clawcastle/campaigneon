from typing import Optional
from datetime import datetime
from uuid import UUID


class User:
    def __init__(
        self,
        id: str,
        display_name: str,
        email: str,
        created_at: int,
    ) -> None:
        self.id = id
        self.email = email
        self.created_at = created_at
        self.display_name = display_name


class Entry:
    def __init__(
        self,
        id: UUID,
        campaign_id: str,
        title: str,
        entry_text_rich: str,
        entry_text_raw: str,
        created_at: datetime,
        last_modified_at: datetime,
        created_by: str,
        last_modified_by: str,
        entry_text_summary: Optional[str],
        category_id: Optional[str],
    ) -> None:
        self.id = id
        self.campaign_id = campaign_id
        self.title = title
        self.entry_text_rich = entry_text_rich
        self.entry_text_raw = entry_text_raw
        self.created_at = created_at
        self.last_modified_at = last_modified_at
        self.created_by = created_by
        self.last_modified_by = last_modified_by
        self.entry_text_summary = entry_text_summary
        self.category_id = category_id


class EntryMetadata:
    def __init__(
        self,
        id: str,
        campaign_id: str,
        title: str,
        created_at: datetime,
        created_by: str,
        last_modified_at: datetime,
        last_modified_by: str,
        category_id: Optional[str],
    ) -> None:
        self.id = id
        self.campaign_id = campaign_id
        self.title = title
        self.created_at = created_at
        self.created_by = created_by
        self.last_modified_at = last_modified_at
        self.last_modified_by = last_modified_by
        self.category_id = category_id


class Campaign:
    def __init__(
        self, id: UUID, title: str, created_at: datetime, created_by: str
    ) -> None:
        self.id = id
        self.title = title
        self.created_at = created_at
        self.created_by = created_by


class CampaignMember:
    def __init__(self, campaign_id: str, user_id: str, is_dm: bool) -> None:
        self.campaign_id = campaign_id
        self.user_id = user_id
        self.is_dm = is_dm


class Category:
    def __init__(
        self,
        id: UUID,
        campaign_id: UUID,
        title: str,
        created_at: datetime,
        parent_id: Optional[UUID],
    ) -> None:
        self.id = id
        self.campaign_id = campaign_id
        self.title = title
        self.created_at = created_at
        self.parent_id = parent_id


class EntryImageMetadata:
    def __init__(
        self,
        image_id: UUID,
        campaign_id: UUID,
        entry_id: UUID,
        created_at: datetime,
        file_name: str,
    ) -> None:
        self.image_id = image_id
        self.campaign_id = campaign_id
        self.entry_id = entry_id
        self.created_at = created_at
        self.file_name = file_name


class EntryImage:
    def __init__(self, entry_id: UUID, url: str, created_at: datetime) -> None:
        self.entry_id = entry_id
        self.url = url
        self.created_at = created_at
