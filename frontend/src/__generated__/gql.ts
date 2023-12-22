/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n                        mutation CreateCampaign($title: String!) {\n                          createCampaign(title: $title) {\n                            id\n                            title\n                          }\n                        }\n": types.CreateCampaignDocument,
    "\n    mutation CreateEntry($campaignId: UUID!, $title: String!, $categoryId: UUID) {\n        createEntry(campaignId: $campaignId, title: $title, categoryId: $categoryId) {\n            id\n            title\n        }\n    }\n": types.CreateEntryDocument,
    "\n    mutation UpdateEntry($entryId: UUID!, $title: String!, $entryTextRich: String!, $entryTextRaw: String!, $entryTextSummary: String) {\n        updateEntry(\n            entryId: $entryId\n            title: $title\n            entryTextRich: $entryTextRich\n            entryTextRaw: $entryTextRaw\n            entryTextSummary: $entryTextSummary\n        ) {\n            id\n            title\n            entryTextRich\n            entryTextRaw\n            entryTextSummary\n        }\n    }\n": types.UpdateEntryDocument,
    "\n                    query FetchCampaignItemsMetadata($campaignId: UUID!) {\n                        campaigns {\n                            id\n                            title\n                            createdAt\n                            createdBy\n                        }\n                        entriesMetadata(campaignId: $campaignId) {\n                            id\n                            title\n                            createdAt\n                            createdBy\n                            lastModifiedAt\n                            lastModifiedBy\n                            categoryId\n                        }\n                        categories(campaignId: $campaignId) {\n                            id\n                            title\n                            parentId\n                            createdAt\n                        }\n                    }\n": types.FetchCampaignItemsMetadataDocument,
    "\n    query FetchEntry($entryId: UUID!) {\n        entry(entryId: $entryId) {\n            id\n            campaignId\n            title\n            entryTextRich\n            createdAt\n            lastModifiedAt\n            createdBy\n            lastModifiedBy\n            entryTextSummary\n            categoryId\n          }\n        }\n": types.FetchEntryDocument,
    "\n                        query FetchCampaigns {\n                            campaigns {\n                                id\n                                title\n                            }\n                        }\n": types.FetchCampaignsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                        mutation CreateCampaign($title: String!) {\n                          createCampaign(title: $title) {\n                            id\n                            title\n                          }\n                        }\n"): (typeof documents)["\n                        mutation CreateCampaign($title: String!) {\n                          createCampaign(title: $title) {\n                            id\n                            title\n                          }\n                        }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateEntry($campaignId: UUID!, $title: String!, $categoryId: UUID) {\n        createEntry(campaignId: $campaignId, title: $title, categoryId: $categoryId) {\n            id\n            title\n        }\n    }\n"): (typeof documents)["\n    mutation CreateEntry($campaignId: UUID!, $title: String!, $categoryId: UUID) {\n        createEntry(campaignId: $campaignId, title: $title, categoryId: $categoryId) {\n            id\n            title\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateEntry($entryId: UUID!, $title: String!, $entryTextRich: String!, $entryTextRaw: String!, $entryTextSummary: String) {\n        updateEntry(\n            entryId: $entryId\n            title: $title\n            entryTextRich: $entryTextRich\n            entryTextRaw: $entryTextRaw\n            entryTextSummary: $entryTextSummary\n        ) {\n            id\n            title\n            entryTextRich\n            entryTextRaw\n            entryTextSummary\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateEntry($entryId: UUID!, $title: String!, $entryTextRich: String!, $entryTextRaw: String!, $entryTextSummary: String) {\n        updateEntry(\n            entryId: $entryId\n            title: $title\n            entryTextRich: $entryTextRich\n            entryTextRaw: $entryTextRaw\n            entryTextSummary: $entryTextSummary\n        ) {\n            id\n            title\n            entryTextRich\n            entryTextRaw\n            entryTextSummary\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                    query FetchCampaignItemsMetadata($campaignId: UUID!) {\n                        campaigns {\n                            id\n                            title\n                            createdAt\n                            createdBy\n                        }\n                        entriesMetadata(campaignId: $campaignId) {\n                            id\n                            title\n                            createdAt\n                            createdBy\n                            lastModifiedAt\n                            lastModifiedBy\n                            categoryId\n                        }\n                        categories(campaignId: $campaignId) {\n                            id\n                            title\n                            parentId\n                            createdAt\n                        }\n                    }\n"): (typeof documents)["\n                    query FetchCampaignItemsMetadata($campaignId: UUID!) {\n                        campaigns {\n                            id\n                            title\n                            createdAt\n                            createdBy\n                        }\n                        entriesMetadata(campaignId: $campaignId) {\n                            id\n                            title\n                            createdAt\n                            createdBy\n                            lastModifiedAt\n                            lastModifiedBy\n                            categoryId\n                        }\n                        categories(campaignId: $campaignId) {\n                            id\n                            title\n                            parentId\n                            createdAt\n                        }\n                    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query FetchEntry($entryId: UUID!) {\n        entry(entryId: $entryId) {\n            id\n            campaignId\n            title\n            entryTextRich\n            createdAt\n            lastModifiedAt\n            createdBy\n            lastModifiedBy\n            entryTextSummary\n            categoryId\n          }\n        }\n"): (typeof documents)["\n    query FetchEntry($entryId: UUID!) {\n        entry(entryId: $entryId) {\n            id\n            campaignId\n            title\n            entryTextRich\n            createdAt\n            lastModifiedAt\n            createdBy\n            lastModifiedBy\n            entryTextSummary\n            categoryId\n          }\n        }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                        query FetchCampaigns {\n                            campaigns {\n                                id\n                                title\n                            }\n                        }\n"): (typeof documents)["\n                        query FetchCampaigns {\n                            campaigns {\n                                id\n                                title\n                            }\n                        }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;