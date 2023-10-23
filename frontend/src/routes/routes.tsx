import { HomePage } from "../pages/Home";
import { CampaignPage } from "../pages/Campaign";
import { EntryPage } from "../pages/Entry";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "campaigns/:campaignId",
    element: <CampaignPage />,
  },
  {
    path: "campaigns/:campaignId/entries/:entryId",
    element: <EntryPage />,
  },
];
