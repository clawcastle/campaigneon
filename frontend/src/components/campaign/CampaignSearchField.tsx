import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { CampaignContext } from "../../context/CampaignContext";
import { useNavigate } from "react-router-dom";

export const CampaignSearchField = () => {
  const { campaignItemsMetadata: searchOptions, campaign } = useContext(CampaignContext);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        sx={{ width: 400 }}
        onChange={(e, value) => {
          if (!campaign?.id || !value?.id) return;

          navigate(`/campaigns/${campaign.id}/${value.id}`)
        }}
        disablePortal
        options={searchOptions ?? []}
        getOptionLabel={(option) => option.title}
        size="small"
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </div>
  );
};
