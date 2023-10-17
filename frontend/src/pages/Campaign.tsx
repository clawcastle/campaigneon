import { useParams } from "react-router-dom";
import { Page } from "./Page";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { CampaignContext, CampaignContextProvider } from "../context/CampaignContext";

const CampaignPageContent = () => {
    const { campaign, loading, error } = useContext(CampaignContext);

    if (loading) {
        return <div>Loading..</div>
    }

    if (error || !campaign) {
        return <div>An error occurred while trying to fetch campaign..</div>
    }

    return <Page>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">{campaign.title}</Typography>
            </Grid>
        </Grid>
    </Page>
}

export const CampaignPage = () => {
    const { campaignId } = useParams();

    if (!campaignId) {
        return <Typography variant="h5">Campaign ID missing from route.</Typography>
    }

    return <CampaignContextProvider campaignId={campaignId}>
        <CampaignPageContent />
    </CampaignContextProvider>
}