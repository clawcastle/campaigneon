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
    <Autocomplete
      disablePortal
      options={searchTerms}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
};
