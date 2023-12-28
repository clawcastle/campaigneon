import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, MobileStepper } from "@mui/material";
import { useState } from "react";

type ImageDialogProps = {
    open: boolean;
    title: string;
    imageUrls: string[];
    onClose: () => void;
}

export const ImageDialog = ({ open, title, imageUrls, onClose }: ImageDialogProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevious = () => {
        const prev = currentImageIndex - 1 >= 0 ? currentImageIndex - 1 : imageUrls.length - 1;

        setCurrentImageIndex(prev);
    }

    const handleNext = () => {
        const next = currentImageIndex + 1 < imageUrls.length ? currentImageIndex + 1 : 0;

        setCurrentImageIndex(next);
    }

    const handleClose = () => {
        onClose();
        setCurrentImageIndex(0);
    }

    return <Dialog open={open} maxWidth="xl" onClose={handleClose}>
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
            {imageUrls.length > 0 && (<>
                <img src={imageUrls[currentImageIndex]} style={{ maxWidth: 764, maxHeight: 764 }} />
                <MobileStepper steps={imageUrls.length} position="static" activeStep={currentImageIndex} nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={imageUrls.length < 2}
                    >
                        <KeyboardArrowRight />
                    </Button>
                }
                    backButton={
                        <Button size="small" onClick={handlePrevious} disabled={imageUrls.length < 2}>
                            <KeyboardArrowLeft />
                        </Button>
                    }>
                </MobileStepper>
            </>
            )}
        </DialogContent>
    </Dialog>
}