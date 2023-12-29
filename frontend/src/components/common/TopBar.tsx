import { AppBar, Breadcrumbs, Link, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export type Breadcrumb = { title: string; href: string; };

type TopBarProps = {
  breadcrumbs: Breadcrumb[]
};

export const TopBar = ({ breadcrumbs }: TopBarProps) => {
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
        <Breadcrumbs>
          {breadcrumbs.map(breadcrumb => (
            <Link underline="hover" color="white" href={breadcrumb.href}>
              {breadcrumb.title}
            </Link>
          ))}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};
