from typing import Optional
from datetime import datetime


class User:
    def __init__(
        self,
        id: str,
        display_name: str,
        email: str,
        created_at: int,
        password_hash: str,
        password_salt: str,
    ) -> None:
        self.id = id
        self.display_name = display_name
        self.email = email
        self.created_at = created_at
        self.password_hash = password_hash
        self.password_salt = password_salt


class Entry:
    def __init__(
        self,
        id: str,
        title: str,
        campaign_id: str,
        category_id: str,
        entry_text_rich: str,
        entry_text_raw: str,
        created_at: datetime,
        last_modified_at: datetime,
        summary: Optional[str] = None,
        image_url: Optional[str] = None,
    ) -> None:
        self.id = id
        self.title = title
        self.campaign_id = campaign_id
        self.category_id = category_id
        self.entry_text_rich = entry_text_rich
        self.entry_text_raw = entry_text_raw
        self.created_at = created_at
        self.last_modified_at = last_modified_at
        self.summary = summary
        self.image_url = image_url


class EntryMetadata:
    def __init__(
        self,
        id: str,
        title: str,
        campaign_id: str,
        category_id: str,
        created_at: datetime,
        last_modified_at: datetime,
    ) -> None:
        self.id = id
        self.title = title
        self.campaign_id = campaign_id
        self.category_id = category_id
        self.created_at = created_at
        self.last_modified_at = last_modified_at


class Campaign:
    def __init__(self, id: str, name: str, created_at: datetime) -> None:
        self.id = id
        self.name = name
        self.created_at = created_at


class CampaignMember:
    def __init__(self, campaign_id: str, user_id: str, is_dm: bool) -> None:
        self.campaign_id = campaign_id
        self.user_id = user_id
        self.is_dm = is_dm


class Category:
    def __init__(
        self,
        id: str,
        campaign_id: str,
        title: str,
        created_at: datetime,
        parent_id: Optional[str],
    ) -> None:
        self.id = id
        self.campaign_id = campaign_id
        self.title = title
        self.created_at = created_at
        self.parent_id = parent_id