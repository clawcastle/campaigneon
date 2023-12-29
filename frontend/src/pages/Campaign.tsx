import { Page } from "./Page";
import { Box, Grid, Skeleton, Tab, Tabs } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import {
  CampaignContext,
} from "../context/CampaignContext";
import { CampaignSearchField } from "../components/campaign/CampaignSearchField";
import { CreateEntryButton } from "../components/entry/CreateEntryButton";


export const CampaignPage = () => {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { campaign, loading, error } = useContext(CampaignContext);

  const breadcrumbs = useMemo(() => {
    if (!campaign) {
      return [{ title: "Campaigns", href: "/" }];
    }

    return [{ title: "Campaigns", href: "/" }, { title: campaign.title, href: `/campaigns/${campaign.id}` }]
  }, [campaign]);

  return (
    <Page requireAuthenticatedUser pageTitle={campaign?.title ?? ""} breadcrumbs={breadcrumbs}>
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
