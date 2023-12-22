import React, { useContext, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { gql } from "../../__generated__";
import { useMutation } from "@apollo/client";
import { CampaignContext } from "../../context/CampaignContext";

const CREATE_ENTRY_MUTATION = gql(`
    mutation CreateEntry($campaignId: UUID!, $title: String!, $categoryId: UUID) {
        createEntry(campaignId: $campaignId, title: $title, categoryId: $categoryId) {
            id
            title
        }
    }
`)

type CreateEntryDialogProps = {
    open: boolean;
    onClose: () => void;
}

export const CreateEntryDialog = ({ open, onClose }: CreateEntryDialogProps) => {
    const { campaign } = useContext(CampaignContext);
    const [entryTitle, setEntryTitle] = useState("");

    const [createEntryMutationFn, { loading, error }] = useMutation(CREATE_ENTRY_MUTATION, {
        refetchQueries: ["FetchEntry"]
    });

    const onDialogClosed = () => {
        setEntryTitle("");
        onClose();
    };

    const onEntryTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEntryTitle(e.target.value)
    };

    const onCreateClicked = async () => {
        if (!campaign) return;

        await createEntryMutationFn({
            variables: {
                campaignId: campaign.id,
                title: entryTitle,
                categoryId: null
            }
        });

        if (!error) {
            onDialogClosed();
        }
    }

    return (<Dialog open={open}>
        <DialogTitle>
            New entry
        </DialogTitle>
        <DialogContent>
            <TextField value={entryTitle} onChange={onEntryTitleChange} />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="secondary" onClick={onDialogClosed}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={onCreateClicked} disabled={loading}>Create</Button>
        </DialogActions>
    </Dialog >)
}