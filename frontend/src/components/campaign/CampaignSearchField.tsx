import { Autocomplete, TextField } from "@mui/material";
import { useContext, useMemo } from "react";
import { CampaignContext } from "../../context/CampaignContext";

export const CampaignSearchField = () => {
  const { campaignItemsMetadata } = useContext(CampaignContext);

  const searchTerms = useMemo(() => {
    if (!campaignItemsMetadata) {
      return [];
    }

    return campaignItemsMetadata.map((c) => c.title);
  }, [campaignItemsMetadata]);

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
        disablePortal
        options={searchTerms}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </div>
  );
};
