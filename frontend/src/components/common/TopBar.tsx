import { useQuery } from "@apollo/client"
import { gql } from "../../__generated__/gql";

const FETCH_CAMPAIGNS_QUERY = gql(`
                        query FetchCampaigns {
                            campaigns {
                                id
                                title
                            }
                        }
`);

export const TopBar = () => {
    const { data, loading } = useQuery(FETCH_CAMPAIGNS_QUERY);

    if (loading || !data) return (<div>
        No campaign selected
    </div>);

    return (<div>
        {data.campaigns.map(c => c.title)}
    </div>)
}