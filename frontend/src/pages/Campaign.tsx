import { useParams } from "react-router-dom";
import { Page } from "./Page";
import { Box, Grid, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  CampaignContext,
  CampaignContextProvider,
} from "../context/CampaignContext";
import { CampaignSearchField } from "../components/campaign/CampaignSearchField";
import { CreateEntryButton } from "../components/entry/CreateEntryButton";

const CampaignPageContent = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { campaign, loading, error } = useContext(CampaignContext);

  return (
    <Page requireAuthenticatedUser pageTitle={campaign?.title ?? ""}>
      {loading && <Skeleton />}
      {error && <div>An error occurred while trying to fetch campaign..</div>}
      {campaign && (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Tabs
              value={selectedTabIndex}
              onChange={(_, value) => {
                setSelectedTabIndex(value);
              }}
            >
              <Tab label="Home" />
              <Tab label="Entries" />
              <Tab label="Media" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} />
            <CampaignSearchField />
          </Grid>
        </Grid>
      )}
      <CreateEntryButton />
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
