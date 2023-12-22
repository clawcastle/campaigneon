import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Entry } from "../../__generated__/graphql";

type EntryImageProps = {
    entry: Omit<Entry, "entryTextRaw">;
}

export const EntryImage = ({ entry }: EntryImageProps) => {
    return (<Card>
        <CardMedia component="img" height={300} alt={entry.title} image="todo" />
        <CardContent>
            <Typography variant="body2">
                {entry.entryTextSummary}
            </Typography>
        </CardContent>
    </Card>)
}