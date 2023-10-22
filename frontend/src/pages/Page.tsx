import React from "react";
import { TopBar } from "../components/common/TopBar";
import { AuthGuard } from "../components/common/AuthGuard";

type PageProps = {
  requireAuthenticatedUser: boolean;
  children: React.ReactNode;
  pageTitle: string;
};

export const Page: React.FC<PageProps> = ({
  children,
  requireAuthenticatedUser,
  pageTitle,
}) => {
  if (requireAuthenticatedUser) {
    return (
      <>
        <AuthGuard>
          <TopBar pageTitle={pageTitle} />
          <div style={{ marginLeft: 16 }}>{children}</div>
        </AuthGuard>
      </>
    );
  }

  return (
    <>
      <TopBar pageTitle={pageTitle} />
      {children}
    </>
  );
};
