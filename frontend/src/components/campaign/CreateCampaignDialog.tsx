import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { gql } from "../../__generated__";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_CAMPAIGN_MUTATION = gql(`
                        mutation CreateCampaign($title: String!) {
                          createCampaign(title: $title) {
                            id
                            title
                          }
                        }
`);

type CreateCampaignDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateCampaignDialog = ({
  open,
  onClose,
}: CreateCampaignDialogProps) => {
  const [campaignTitle, setCampaignTitle] = useState("");

  const [createCampaignMutationFn, { loading, error }] = useMutation(
    CREATE_CAMPAIGN_MUTATION
  );

  const onCreateButtonClicked = async () => {
    await createCampaignMutationFn({
      variables: {
        title: campaignTitle,
      },
    });

    if (!error) {
      onClose();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Create campaign</DialogTitle>
      <DialogContent>
        <TextField
          value={campaignTitle}
          onChange={(e) => {
            setCampaignTitle(e.target.value);
          }}
        />
        {!!error && <Typography variant="body2">An error occurred.</Typography>}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={onCreateButtonClicked}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
