import React, { createContext, useMemo } from "react";
import { Campaign, CampaignItemMetadata } from "../models/models";
import {
  useFetchCampaign,
  FetchCampaignQueryError,
} from "../hooks/useFetchCampaign";

type CampaignContextValue = {
  campaign?: Campaign;
  campaignItemsMetadata?: CampaignItemMetadata[];
  loading: boolean;
  error?: FetchCampaignQueryError;
};

export const CampaignContext = createContext<CampaignContextValue>({
  loading: true,
});

type CampaignContextProviderProps = {
  campaignId: string;
  children?: React.ReactNode;
};

export const CampaignContextProvider: React.FC<
  CampaignContextProviderProps
> = ({ campaignId, children }) => {
  const { data, loading, error } = useFetchCampaign(campaignId);

  const contextValue: CampaignContextValue = useMemo(
    () => ({
      ...data,
      loading,
      error,
    }),
    [data, error, loading]
  );

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
};
