import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
