import { ApolloError, useQuery } from "@apollo/client";
import { gql } from "../__generated__";

const FETCH_CAMPAIGN_ITEMS_METADATA = gql(`
                                            query FetchCampaignItemsMetadata($campaignId: UUID!) {
                                                entriesMetadata(campaignId: $campaignId) {
                                                    id
                                                    title
                                                    createdAt
                                                    createdBy
                                                    lastModifiedAt
                                                    lastModifiedBy
                                                    categoryId
                                                }
                                                categories(campaignId: $campaignId) {
                                                    id
                                                    title
                                                    parentId
                                                    createdAt
                                                }
                                            }
`);

interface EntryMetadata {
    id: string,
    campaignId: string,
    title: string,
    createdAt: string,
    createdBy: string,
    lastModifiedAt: string,
    lastModifiedBy: string,
    categoryId: string | null | undefined
}

interface CategoryMetadata {
    id: string,
    campaignId: string,
    title: string,
    createdAt: string,
    categoryId?: string
}

type CampaignItemMetadata = EntryMetadata | CategoryMetadata;

type UseCampaignItemsMetadataQueryResult = {
    data?: CampaignItemMetadata[];
    loading: boolean;
    error?: ApolloError;
}

export const useCampaignItemsMetadata = (campaignId: string): UseCampaignItemsMetadataQueryResult => {
    const { data, loading, error } = useQuery(FETCH_CAMPAIGN_ITEMS_METADATA, {
        variables: {
            campaignId
        }
    });

    if (loading || error || !data) {
        return { loading, error }
    }

    const entriesMetadata: EntryMetadata[] = data.entriesMetadata.map(e => ({ id: e.id, campaignId: campaignId, title: e.title, createdAt: e.createdAt, createdBy: e.createdBy, categoryId: e.categoryId, lastModifiedAt: e.lastModifiedAt, lastModifiedBy: e.lastModifiedBy }));
    const categoryMetata: CategoryMetadata[] = data.categories.map(c => ({ id: c.id, campaignId: campaignId, title: c.title, createdAt: c.createdAt, categoryId: c.parentId }));

    return { data: [...entriesMetadata, ...categoryMetata], loading, error };
}