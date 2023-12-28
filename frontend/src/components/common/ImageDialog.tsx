import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

type ImageDialogProps = {
    open: boolean;
    title: string;
    imageUrls: string[];
    onClose: () => void;
}

export const ImageDialog = ({open, title, imageUrls, onClose}: ImageDialogProps) => {
    const [currentImageIndex] = useState(0);

    return <Dialog open={open} maxWidth="xl" onClose={onClose}>
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
            {imageUrls.length > 0 && (
                <img src={imageUrls[currentImageIndex]} style={{maxWidth: 764, maxHeight: 764}} />
            )}
        </DialogContent>
    </Dialog>
}