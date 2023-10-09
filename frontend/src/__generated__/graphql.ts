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
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastModifiedAt: Scalars['DateTime']['output'];
  lastModifiedBy: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  createCategory: Category;
  createEntry: Entry;
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

export type Query = {
  __typename?: 'Query';
  campaigns: Array<Campaign>;
  categories: Array<Category>;
  entry: Entry;
};


export type QueryCategoriesArgs = {
  campaignId: Scalars['UUID']['input'];
};


export type QueryEntryArgs = {
  entryId: Scalars['UUID']['input'];
};

export type FetchCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: any, title: string }> };


export const FetchCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchCampaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FetchCampaignsQuery, FetchCampaignsQueryVariables>;