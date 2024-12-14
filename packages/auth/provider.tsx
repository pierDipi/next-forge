import type {ReactNode} from 'react';
import {SessionProvider} from "next-auth/react";

type AuthProviderProps = {
  children: ReactNode;
  disabled?: boolean
};

export const AuthProvider = ({children, disabled}: AuthProviderProps) => {
  if (disabled == undefined || !disabled) {
    return <SessionProvider>{children}</SessionProvider>;
  }
  return children
}
