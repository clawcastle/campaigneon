import React from "react";
import { TopBar } from "../components/common/TopBar";
import { AuthGuard } from "../components/common/AuthGuard";

type PageProps = {
  requireAuthenticatedUser: boolean;
  children: React.ReactNode;
};

export const Page: React.FC<PageProps> = ({
  children,
  requireAuthenticatedUser,
}) => {
  if (requireAuthenticatedUser) {
    return (
      <AuthGuard>
        <TopBar />
        <div style={{ marginTop: 16, marginLeft: 16 }}>{children}</div>
      </AuthGuard>
    );
  }

  return (
    <>
      <TopBar />
      {children}
    </>
  );
};
