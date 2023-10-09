import { HomePage } from "../pages/Home";
import { CampaignPage } from "../pages/Campaign";

export const routes = [{
    path: "/",
    element: <HomePage />
}, {
    path: "campaigns/:campaignId",
    element: <CampaignPage />
}];