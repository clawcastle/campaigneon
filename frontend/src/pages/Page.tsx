import React from "react";
import { Breadcrumb, TopBar } from "../components/common/TopBar";
import { AuthGuard } from "../components/common/AuthGuard";
import { Typography } from "@mui/material";

type PageProps = {
  requireAuthenticatedUser: boolean;
  children: React.ReactNode;
  pageTitle: string;
  breadcrumbs: Breadcrumb[];
};

export const Page: React.FC<PageProps> = ({
  children,
  requireAuthenticatedUser,
  pageTitle,
  breadcrumbs
}) => {
  if (requireAuthenticatedUser) {
    return (
      <>
        <AuthGuard>
          <TopBar breadcrumbs={breadcrumbs} />
          <div style={{ marginLeft: 16 }}>
            <Typography variant="h5" sx={{ marginTop: 1 }}>{pageTitle}</Typography>
            {children}</div>
        </AuthGuard>
      </>
    );
  }

  return (
    <>
      <TopBar pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
};
