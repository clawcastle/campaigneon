import { useParams } from "react-router-dom";
import { Page } from "./Page";
import { Grid, Typography } from "@mui/material";
import { useFetchCampaign } from "../hooks/graphQlHooks"

export const CampaignPage = () => {
    const { campaignId } = useParams();

    const { data, loading } = useFetchCampaign(campaignId ?? "");

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>Campaign not found...</div>
    }

    const { campaign } = data;

    return <Page>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">{campaign.title}</Typography>
            </Grid>
        </Grid>
    </Page>
}