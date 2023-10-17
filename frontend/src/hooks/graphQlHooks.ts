import { ApolloError, useQuery } from "@apollo/client";
import { gql } from "../__generated__";

const FETCH_CAMPAIGN_DATA = gql(`
                                            query FetchCampaignItemsMetadata($campaignId: UUID!) {
                                                campaigns {
                                                    id
                                                    title
                                                    createdAt
                                                    createdBy
                                                }
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

interface Category {
    id: string,
    campaignId: string,
    title: string,
    createdAt: string,
    categoryId?: string
}

interface Campaign {
    id: string,
    title: string,
    createdAt: string,
    createdBy: string
}

type CampaignItemMetadata = EntryMetadata | Category;

type UseFetchCampaignQueryResult = {
    data?: {
        campaign: Campaign,
        campaignItemsMetadata: CampaignItemMetadata[]
    };
    loading: boolean;
    error?: ApolloError;
}

export const useFetchCampaign = (campaignId: string): UseFetchCampaignQueryResult => {
    const { data, loading, error } = useQuery(FETCH_CAMPAIGN_DATA, {
        variables: {
            campaignId
        }
    });

    if (loading || error || !data) {
        return { loading, error }
    }

    const campaign = data.campaigns.find(campaign => campaign.id === campaignId);

    if (!campaign) {
        return { loading, error: new ApolloError({ errorMessage: "Query did not return any campaign with the selected id." }) };
    }

    const entriesMetadata: EntryMetadata[] = data.entriesMetadata.map(e => ({ id: e.id, campaignId: campaignId, title: e.title, createdAt: e.createdAt, createdBy: e.createdBy, categoryId: e.categoryId, lastModifiedAt: e.lastModifiedAt, lastModifiedBy: e.lastModifiedBy }));
    const categoryMetata: Category[] = data.categories.map(c => ({ id: c.id, campaignId: campaignId, title: c.title, createdAt: c.createdAt, categoryId: c.parentId }));

    return { data: { campaign, campaignItemsMetadata: [...entriesMetadata, ...categoryMetata] }, loading, error };
}