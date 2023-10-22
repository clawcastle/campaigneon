import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const TopBar = () => {
  const navigate = useNavigate();

  const onHomeClicked = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <AppBar position="static">
      <Toolbar>
        <HomeIcon sx={{ marginRight: 1, cursor: "pointer" }} />
        <Typography sx={{ cursor: "pointer" }} onClick={onHomeClicked}>
          Campaigneon
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
