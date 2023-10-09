import { useQuery } from "@apollo/client";
import { gql } from "../__generated__"
import { useParams } from "react-router-dom";

const FETCH_CAMPAIGNS_QUERY = gql(`
                        query FetchCampaigns {
                            campaigns {
                                id
                                title
                            }
                        }
`);

export const CampaignPage = () => {
    const { campaignId } = useParams();

    const { data, loading } = useQuery(FETCH_CAMPAIGNS_QUERY);

    if (loading) {
        return <div>Loading...</div>
    }

    const campaign = data?.campaigns.find(campaign => campaign.id === campaignId);

    if (!campaign) {
        return <div>Campaign not found...</div>
    }

    return <h2>{campaign.title}</h2>
}