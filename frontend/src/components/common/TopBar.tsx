import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import "./TopBar.css";
import { useNavigate } from "react-router-dom";
import React from "react";

const FETCH_CAMPAIGNS_QUERY = gql(`
                        query FetchCampaigns {
                            campaigns {
                                id
                                title
                            }
                        }
`);

export const TopBar = () => {
    const navigate = useNavigate();
    const { data } = useQuery(FETCH_CAMPAIGNS_QUERY);

    const onCampaignSelected = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        if (!evt.target.value) {
            navigate("/")
        } else {
            navigate(`campaigns/${evt.target.value}`);
        }
    }

    return (<div className="top-bar">
        <select className="campaign-selector" onChange={onCampaignSelected}>
            <option key="none" value={undefined}>
                No campaign selected
            </option>
            {data?.campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                    {campaign.title}
                </option>
            ))}
        </select>
    </div>)
}