import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type CampaignCardProps = {
  id: string;
  title: string;
};

export const CampaignCard = ({ id, title }: CampaignCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minHeight: 300 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/campaigns/${id}`);
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            There should be some text here about the campaign.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
