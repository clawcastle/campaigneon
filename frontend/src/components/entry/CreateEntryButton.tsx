import { useCallback, useContext, useState } from "react"
import { CampaignContext } from "../../context/CampaignContext"
import { Fab } from "@mui/material";
import { CreateEntryDialog } from "./CreateEntryDialog";

export const CreateEntryButton = () => {
    const { campaign } = useContext(CampaignContext);

    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const onClicked = useCallback(() => {
        if (!campaign) return;

        setCreateDialogOpen(true);

    }, [campaign]);

    const onDialogClose = useCallback(() => {
        setCreateDialogOpen(false);
    }, [])

    if (!campaign) return null;

    return <>
        <CreateEntryDialog open={createDialogOpen} onClose={onDialogClose} />
        <Fab sx={{ position: "absolute", left: "90%", top: "90%" }} variant="extended" color="primary" onClick={onClicked}>New entry</Fab>
    </>
}