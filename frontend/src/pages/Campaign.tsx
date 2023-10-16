import { useQuery } from "@apollo/client";
import { gql } from "../__generated__"
import { useParams } from "react-router-dom";
import { Page } from "./Page";
import { Grid, Typography } from "@mui/material";
import { useCampaignItemsMetadata } from "../hooks/graphQlHooks"

const FETCH_CAMPAIGNS_QUERY = gql(`
                        query FetchCampaigns {
                            campaigns {
                                id
                                title
                            }
                        }
`);

export const CampaignPage = () => {
    const { campaignId } = useParams();

    const { data, loading } = useQuery(FETCH_CAMPAIGNS_QUERY);
    const { data: campaignItemsMetadata, loading: loadingCampaignItemsMetadata } = useCampaignItemsMetadata(campaignId ?? "");

    if (loading) {
        return <div>Loading...</div>
    }

    const campaign = data?.campaigns.find(campaign => campaign.id === campaignId);

    if (!campaign) {
        return <div>Campaign not found...</div>
    }

    return <Page>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">{campaign.title}</Typography>
            </Grid>
        </Grid>
    </Page>
}