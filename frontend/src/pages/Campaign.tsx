import { useParams } from "react-router-dom";
import { Page } from "./Page";
import { Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  CampaignContext,
  CampaignContextProvider,
} from "../context/CampaignContext";
import { CampaignSearchField } from "../components/campaign/CampaignSearchField";

const CampaignPageContent = () => {
  const { campaign, loading, error } = useContext(CampaignContext);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error || !campaign) {
    return <div>An error occurred while trying to fetch campaign..</div>;
  }

  return (
    <Page requireAuthenticatedUser>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{campaign.title}</Typography>
          <CampaignSearchField />
        </Grid>
      </Grid>
    </Page>
  );
};

export const CampaignPage = () => {
  const { campaignId } = useParams();

  useEffect(() => {
    if (!campaignId) return;

    localStorage.setItem("campaigns.last_viewed", campaignId);
  }, [campaignId]);

  if (!campaignId) {
    return (
      <Typography variant="h5">Campaign ID missing from route.</Typography>
    );
  }

  return (
    <CampaignContextProvider campaignId={campaignId}>
      <CampaignPageContent />
    </CampaignContextProvider>
  );
};
