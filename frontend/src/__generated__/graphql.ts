/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Campaign = {
  __typename?: 'Campaign';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  title: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  campaignId: Scalars['UUID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  parentId?: Maybe<Scalars['UUID']['output']>;
  title: Scalars['String']['output'];
};

export type Entry = {
  __typename?: 'Entry';
  campaignId: Scalars['String']['output'];
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  entryTextRaw: Scalars['String']['output'];
  entryTextRich: Scalars['String']['output'];
  entryTextSummary?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  lastModifiedAt: Scalars['DateTime']['output'];
  lastModifiedBy: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type EntryMetadata = {
  __typename?: 'EntryMetadata';
  campaignId: Scalars['String']['output'];
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastModifiedAt: Scalars['DateTime']['output'];
  lastModifiedBy: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  createCategory: Category;
  createEntry: Entry;
  updateCampaign: Campaign;
  updateEntry: Entry;
};


export type MutationCreateCampaignArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  campaignId: Scalars['UUID']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateEntryArgs = {
  campaignId: Scalars['UUID']['input'];
  categoryId?: InputMaybe<Scalars['UUID']['input']>;
  title: Scalars['String']['input'];
};


export type MutationUpdateCampaignArgs = {
  campaignId: Scalars['UUID']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateEntryArgs = {
  entryId: Scalars['UUID']['input'];
  entryTextRaw: Scalars['String']['input'];
  entryTextRich: Scalars['String']['input'];
  entryTextSummary?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  campaigns: Array<Campaign>;
  categories: Array<Category>;
  entriesMetadata: Array<EntryMetadata>;
  entry: Entry;
};


export type QueryCategoriesArgs = {
  campaignId: Scalars['UUID']['input'];
};


export type QueryEntriesMetadataArgs = {
  campaignId: Scalars['UUID']['input'];
};


export type QueryEntryArgs = {
  entryId: Scalars['UUID']['input'];
};

export type FetchCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: any, title: string }> };

export type FetchCampaignItemsMetadataQueryVariables = Exact<{
  campaignId: Scalars['UUID']['input'];
}>;


export type FetchCampaignItemsMetadataQuery = { __typename?: 'Query', entriesMetadata: Array<{ __typename?: 'EntryMetadata', id: any, title: string, createdAt: any, createdBy: string, lastModifiedAt: any, lastModifiedBy: string, categoryId?: string | null }>, categories: Array<{ __typename?: 'Category', id: any, title: string, parentId?: any | null, createdAt: any }> };


export const FetchCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchCampaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FetchCampaignsQuery, FetchCampaignsQueryVariables>;
export const FetchCampaignItemsMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchCampaignItemsMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entriesMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedBy"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FetchCampaignItemsMetadataQuery, FetchCampaignItemsMetadataQueryVariables>;