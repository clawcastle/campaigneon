import { useAuth0 } from "@auth0/auth0-react";
import { Page } from "./Page";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { CampaignCard } from "../components/campaign/CampaignCard";
import { CreateCampaignDialog } from "../components/campaign/CreateCampaignDialog";
import { useState } from "react";

const FETCH_CAMPAIGNS_QUERY = gql(`
                        query FetchCampaigns {
                            campaigns {
                                id
                                title
                            }
                        }
`);

const HomePageAuthenticated = () => {
  const [createCampaignDialogOpen, setCreateCampaignDialogOpen] =
    useState(false);
  const { data, loading, error } = useQuery(FETCH_CAMPAIGNS_QUERY);

  if (loading) {
    return <Skeleton variant="rectangular" />;
  }

  if (error) {
    return <Typography variant="h5">Something went wrong.</Typography>;
  }

  return (
    <Page requireAuthenticatedUser pageTitle="Campaigneon">
      <CreateCampaignDialog
        open={createCampaignDialogOpen}
        onClose={() => {
          setCreateCampaignDialogOpen(false);
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Box mt={4} />
          <Typography variant="body2">
            Welcome to campaigneon! Select an existing campaign or{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setCreateCampaignDialogOpen(true);
              }}
            >
              create a new one
            </span>{" "}
            to get started.
          </Typography>
          <Box mt={4} />
        </Grid>
        {data?.campaigns.map((campaign) => (
          <Grid key={campaign.id} item xs={12} md={6}>
            <CampaignCard id={campaign.id} title={campaign.title} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

const HomePageUnauthenticated = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <h2>Welcome to Campaigneon. Login to proceed.</h2>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && <HomePageAuthenticated />}
      {!isAuthenticated && <HomePageUnauthenticated />}
    </>
  );
};
