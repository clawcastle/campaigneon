import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Entry } from "../../__generated__/graphql";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";

const FETCH_ENTRY_IMAGES_QUERY = gql(`
    query FetchEntryImages($campaignId: UUID!, $entryId: UUID!) {
        entryImages(campaignId: $campaignId, entryId: $entryId) {
            url
            createdAt
        }
    }
`);

const GENERATE_ENTRY_IMAGE_MUTATION = gql(`
    mutation GenerateEntryImage($campaignId: UUID!, $entryId: UUID!) {
        generateImageForEntry(campaignId: $campaignId, entryId: $entryId) {
            id
            status
        }
    }
`);

type EntryImageProps = {
  entry: Omit<Entry, "entryTextRaw">;
};

export const EntryImage = ({ entry }: EntryImageProps) => {
  const { data, loading, error } = useQuery(FETCH_ENTRY_IMAGES_QUERY, {
    variables: { campaignId: entry.campaignId, entryId: entry.id },
  });

  const [generateEntryImageMutationFn, { loading: imageGenerationLoading }] =
    useMutation(GENERATE_ENTRY_IMAGE_MUTATION, {
      variables: {
        campaignId: entry.campaignId,
        entryId: entry.id,
      },
    });

  const onGenerateImageClicked = async () => {
    await generateEntryImageMutationFn();
  };

  const renderCardContent = () => {
    if (loading || imageGenerationLoading) {
      return <Skeleton height={300} />;
    }

    const hasImage = !loading && !error && data && data.entryImages.length > 0;
    console.log(hasImage);

    return (
      <>
        {hasImage && (
          <CardMedia
            component="img"
            height={300}
            alt={entry.title}
            sx={{ objectFit: "contain" }}
            image={data.entryImages[0].url}
          />
        )}
        <CardContent>
          {!hasImage && <Box height={300} />}
          <Typography variant="body2">{entry.entryTextSummary}</Typography>
        </CardContent>
        {!hasImage && (
          <CardActions>
            <Button variant="contained" color="primary">
              Upload image
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onGenerateImageClicked}
            >
              Generate image with AI
            </Button>
          </CardActions>
        )}
      </>
    );
  };

  return <Card>{renderCardContent()}</Card>;
};
