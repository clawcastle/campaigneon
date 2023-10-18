import Fuse from "fuse.js";
import { TextField } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { CampaignContext } from "../../context/CampaignContext";

export const CampaignSearchField = () => {
  const [query, setQuery] = useState("");

  const { campaignItemsMetadata } = useContext(CampaignContext);

  const searchTerms = useMemo(() => {
    if (!campaignItemsMetadata) {
      return [];
    }

    return campaignItemsMetadata.map((c) => c.title);
  }, [campaignItemsMetadata]);

  const fuse = useMemo(() => new Fuse(searchTerms), [searchTerms]);

  const searchResults = useMemo(() => {
    const results = fuse.search(query);

    return results.map((r) => r.item);
  }, [fuse, query]);

  console.log(searchResults);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return <TextField variant="outlined" onChange={onTextFieldChange} />;
};
