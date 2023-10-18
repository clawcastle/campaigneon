import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  alpha,
  styled,
} from "@mui/material";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { CreateCampaignDialog } from "./CreateCampaignDialog";

const FETCH_CAMPAIGNS_QUERY = gql(`
                        query FetchCampaigns {
                            campaigns {
                                id
                                title
                            }
                        }
`);

const NO_CAMPAIGN_SELECTED_ITEM_KEY = "NO_CAMPAIGN_SELECTED";
const CREATE_CAMPAIGN_SELECT_ITEM_KEY = "CREATE_CAMPAIGN";

type SelectedCampaign = { id: string; title: string } | undefined;

export const CampaignSelector = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<SelectedCampaign>();
  const [createCampaignDialogOpen, setCreateCampaignDialogOpen] =
    useState(false);
  const { data, loading, error } = useQuery(FETCH_CAMPAIGNS_QUERY);

  const onSelectChange = (e: SelectChangeEvent) => {
    if (loading || error || !data) {
      return;
    }

    if (e.target.value === null) {
      setSelectedCampaign(undefined);
    } else if (e.target.value === CREATE_CAMPAIGN_SELECT_ITEM_KEY) {
      setCreateCampaignDialogOpen(true);
    } else {
      const selectedCampaign = data.campaigns.find(
        (c) => c.id === e.target.value
      );

      setSelectedCampaign(selectedCampaign);
    }
  };

  return (
    <>
      <CreateCampaignDialog
        open={createCampaignDialogOpen}
        onClose={() => {
          setCreateCampaignDialogOpen(false);
        }}
      />
      <FormControl sx={{ width: 200 }}>
        <InputLabel>Select campaign</InputLabel>
        <Select
          size="small"
          value={selectedCampaign?.id ?? NO_CAMPAIGN_SELECTED_ITEM_KEY}
          label="Campaign"
          onChange={onSelectChange}
        >
          <MenuItem value={NO_CAMPAIGN_SELECTED_ITEM_KEY}>
            Select campaign
          </MenuItem>
          {data?.campaigns.map((campaign) => (
            <MenuItem key={campaign.id} value={campaign.id}>
              {campaign.title}
            </MenuItem>
          ))}
          <MenuItem value={CREATE_CAMPAIGN_SELECT_ITEM_KEY}>
            Create campaign
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
