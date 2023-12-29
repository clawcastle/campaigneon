import { HomePage } from "../pages/Home";
import { CampaignPage } from "../pages/Campaign";
import { EntryPage } from "../pages/Entry";
import { CampaignContextProvider } from "../context/CampaignContext";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "campaigns/:campaignId",
    element: (<CampaignContextProvider>
      <CampaignPage />
    </CampaignContextProvider>),
  },
  {
    path: "campaigns/:campaignId/entries/:entryId",
    element: (<CampaignContextProvider>
      <EntryPage />
    </CampaignContextProvider>),
  },
];
