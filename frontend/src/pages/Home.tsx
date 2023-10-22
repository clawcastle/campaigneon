import { useAuth0 } from "@auth0/auth0-react";
import { AuthGuard } from "../components/common/AuthGuard";
import { Page } from "./Page";
import { Button, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

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

const HomePageAuthenticated = () => {
  const lastViewedCampaignId = localStorage.getItem("campaigns.last_viewed");

  if (lastViewedCampaignId) {
    return <Navigate to={`/campaigns/${lastViewedCampaignId}`} replace={true} />
  }

  return (
    <AuthGuard>
      <Page>
        {!lastViewedCampaignId &&
          <div>
            <Typography variant="body2">
              Welcome to campaigneon! Select an existing campaign or create a new one to get started.
            </Typography>
          </div>}
      </Page>
    </AuthGuard>
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
