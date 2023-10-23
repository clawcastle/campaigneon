// import { useQuery } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { Page } from "./Page";
import { Grid, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
// import { Page } from "./Page";

const FETCH_ENTRY_QUERY = gql(`
    query FetchEntry($entryId: UUID!) {
        entry(entryId: $entryId) {
            id
            campaignId
            title
            entryTextRich
            createdAt
            lastModifiedAt
            createdBy
            lastModifiedBy
            entryTextSummary
            categoryId
          }
        }
`);

export const EntryPage = () => {
  const { entryId } = useParams();

  const { data, loading, error } = useQuery(FETCH_ENTRY_QUERY, {
    variables: { entryId },
  });

  return (
    <Page requireAuthenticatedUser pageTitle={data?.entry.title ?? ""}>
      <Grid container spacing={2}>
        {loading && (
          <Grid item xs={12} textAlign="center" justifyContent="center">
            <Skeleton variant="rectangular" width={280} height={120} />
          </Grid>
        )}
        {(error || !data) && (
          <Grid item xs={12} textAlign="center" justifyContent="center">
            <Typography variant="h5">An error occurred</Typography>
          </Grid>
        )}
        {data && <Grid item xs={12}></Grid>}
      </Grid>
    </Page>
  );
};
