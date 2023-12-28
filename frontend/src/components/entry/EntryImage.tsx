import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Entry, Job, JobStatus } from "../../__generated__/graphql";
import { gql } from "../../__generated__";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { ImageDialog } from "../common/ImageDialog";

const FETCH_ENTRY_IMAGES_QUERY = gql(`
    query FetchEntryImages($campaignId: UUID!, $entryId: UUID!) {
        entryImages(campaignId: $campaignId, entryId: $entryId) {
            url
            createdAt
        }
    }
`);

const FETCH_JOB_QUERY = gql(`
    query FetchJob($campaignId: UUID!, $jobId: UUID!) {
      jobs(campaignId: $campaignId, jobId: $jobId) {
        id
        status
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
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [generateImageJob, setGenerateImageJob] = useState<Job | undefined>();


  const fetchGenerateImageJobIntervalHandle = useRef<
    NodeJS.Timeout | undefined
  >();

  const {
    data,
    loading,
    error,
    refetch: refetchEntryImages,
  } = useQuery(FETCH_ENTRY_IMAGES_QUERY, {
    variables: { campaignId: entry.campaignId, entryId: entry.id },
  });

  const [getImageGenerationJob] = useLazyQuery(FETCH_JOB_QUERY);

  const [generateEntryImageMutationFn] = useMutation(
    GENERATE_ENTRY_IMAGE_MUTATION,
    {
      variables: {
        campaignId: entry.campaignId,
        entryId: entry.id,
      },
    }
  );

  const entryImages = useMemo(() => {
    if (!data?.entryImages) return [];

    return [...data.entryImages].sort(img => img.createdAt).reverse();
  }, [data?.entryImages])

  useEffect(() => {
    if (!generateImageJob || generateImageJob.status == JobStatus.InProgress)
      return;

    if (generateImageJob.status === JobStatus.Completed) {
      clearInterval(fetchGenerateImageJobIntervalHandle.current);

      refetchEntryImages().then(() => {
        enqueueSnackbar("Successfully generated image", {
          variant: "success",
        });
      });
    } else {
      enqueueSnackbar("An error occurred while generating image.", {
        variant: "error",
      });
    }

    setGenerateImageJob(undefined);
  }, [generateImageJob, refetchEntryImages]);

  const onGenerateImageClicked = async () => {
    const { data: responseData } = await generateEntryImageMutationFn();

    if (!responseData?.generateImageForEntry) {
      enqueueSnackbar("An error occurred while generating image.", {
        variant: "error",
      });
      return;
    }

    setGenerateImageJob(responseData.generateImageForEntry);

    fetchGenerateImageJobIntervalHandle.current = setInterval(async () => {
      const { data: response, error: responseError } =
        await getImageGenerationJob({
          variables: {
            campaignId: entry.campaignId,
            jobId: responseData.generateImageForEntry.id,
          },
          fetchPolicy: "network-only",
        });

      if (responseError) {
        enqueueSnackbar("An error occurred while generating image.", {
          variant: "error",
          preventDuplicate: true
        });

        clearInterval(fetchGenerateImageJobIntervalHandle.current);
        return;
      }

      if (response?.jobs) {
        setGenerateImageJob(response.jobs);
      }
    }, 1500);
  };

  const renderCardContent = () => {
    if (
      loading ||
      (generateImageJob && generateImageJob.status === JobStatus.InProgress)
    ) {
      return <Skeleton height={300} />;
    }

    const hasImage = !loading && !error && entryImages.length > 0;

    return (
      <>
        {entryImages.length > 0 && <ImageDialog open={imageDialogOpen} title={entry.title} imageUrls={entryImages.map(entryImage => entryImage.url)} onClose={() => setImageDialogOpen(false)} />}
        {hasImage && (
          <CardActionArea onClick={() => setImageDialogOpen(true)}>
            <CardMedia
              component="img"
              height={300}
              alt={entry.title}
              sx={{ objectFit: "contain" }}
              image={entryImages[0].url}
            />
          </CardActionArea>
        )}
        <CardContent>
          {!hasImage && <Box height={300} />}
          <Typography variant="body2">{entry.entryTextSummary}</Typography>
        </CardContent>
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
      </>
    );
  };

  return <Card>{renderCardContent()}</Card>;
};
