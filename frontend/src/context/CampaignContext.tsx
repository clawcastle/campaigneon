import React, { createContext, useEffect, useMemo } from "react";
import { Campaign, CampaignItemMetadata } from "../models/models";
import {
  FetchCampaignQueryError,
  useFetchCampaign,
} from "../hooks/useFetchCampaign";
import { useParams } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";

type CampaignContextValue = {
  campaign?: Campaign;
  campaignItemsMetadata?: CampaignItemMetadata[];
  loading: boolean;
  error?: FetchCampaignQueryError;
};

export const CampaignContext = createContext<CampaignContextValue>({} as CampaignContextValue);

type CampaignContextProviderProps = {
  children?: React.ReactNode;
};

type CampaignContextProviderInnerProps = {
  campaignId: string;
  children?: React.ReactNode;
};

export const CampaignContextProviderInner = ({ children, campaignId }: CampaignContextProviderInnerProps) => {
  const { data, loading, error } = useFetchCampaign(campaignId);

  const contextValue = useMemo(
    () => ({
      ...data,
      loading,
      error
    }),
    [data, error, loading]
  );

  if (loading || !contextValue.campaign || !contextValue.campaignItemsMetadata) return (<Skeleton />);

  if (error) return <Typography>Failed to fetch campaign.</Typography>

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
}


export const CampaignContextProvider: React.FC<
  CampaignContextProviderProps
> = ({ children }) => {
  const { campaignId } = useParams();

  useEffect(() => {
    if (!campaignId) return;

    localStorage.setItem("campaigns.last_viewed", campaignId);
  }, [campaignId]);

  if (!campaignId) return null;

  return (<CampaignContextProviderInner campaignId={campaignId}>
    {children}
  </CampaignContextProviderInner>)
};
