import { AppBar, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

type TopBarProps = {
  pageTitle: string;
};

export const TopBar = ({ pageTitle }: TopBarProps) => {
  const navigate = useNavigate();

  const onHomeClicked = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <AppBar position="static">
      <Toolbar>
        <HomeIcon
          sx={{ marginRight: 1, cursor: "pointer" }}
          onClick={onHomeClicked}
        />
        <Typography>{pageTitle}</Typography>
      </Toolbar>
    </AppBar>
  );
};
