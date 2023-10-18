import { CampaignSelector } from "../campaign/CampaignSelector";
import { AppBar, Toolbar } from "@mui/material";

export const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CampaignSelector />
      </Toolbar>
    </AppBar>
  );
};
