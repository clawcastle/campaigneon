export interface EntryMetadata {
  id: string;
  campaignId: string;
  title: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  categoryId: string | null | undefined;
}

// export interface Entry {
//   id: string;
//   campaignId: string;
//   title: string;
//   createdAt: string;
//   createdBy: string;
//   lastModifiedAt: string;
//   lastModifiedBy: string;
//   categoryId: string | null | undefined;
//   entryTextRich: string;
//   entryTextRaw: string;
// }

export interface Category {
  id: string;
  campaignId: string;
  title: string;
  createdAt: string;
  categoryId?: string;
}

export interface Campaign {
  id: string;
  title: string;
  createdAt: string;
  createdBy: string;
}

export type CampaignItemMetadata = EntryMetadata | Category;
