import { ApolloError, useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { Campaign, CampaignItemMetadata, Category, EntryMetadata } from "../models/models"

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

export type FetchCampaignQueryError = ApolloError | Error;

type UseFetchCampaignQueryResult = {
    data?: {
        campaign: Campaign,
        campaignItemsMetadata: CampaignItemMetadata[]
    };
    loading: boolean;
    error?: FetchCampaignQueryError;
}

export const useFetchCampaign = (campaignId: string): UseFetchCampaignQueryResult => {
    const { data, loading, error } = useQuery(FETCH_CAMPAIGN_DATA, {
        variables: {
            campaignId
        },
    });

    if (loading || error || !data) {
        return { loading, error }
    }

    const campaign = data.campaigns.find(campaign => campaign.id === campaignId);

    if (!campaign) {
        return { loading, error: new Error("Query did not return any campaign with the selected id.") };
    }

    const entriesMetadata: EntryMetadata[] = data.entriesMetadata.map(e => ({ id: e.id, campaignId: campaignId, title: e.title, createdAt: e.createdAt, createdBy: e.createdBy, categoryId: e.categoryId, lastModifiedAt: e.lastModifiedAt, lastModifiedBy: e.lastModifiedBy }));
    const categoryMetata: Category[] = data.categories.map(c => ({ id: c.id, campaignId: campaignId, title: c.title, createdAt: c.createdAt, categoryId: c.parentId }));

    return { data: { campaign, campaignItemsMetadata: [...entriesMetadata, ...categoryMetata] }, loading, error };
}