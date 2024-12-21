import type {ReactNode} from 'react';
import {SessionProvider, SessionProviderProps} from "next-auth/react";

type AuthProviderProps = {
    children: ReactNode;
    disabled?: boolean
    sessionProviderProps?: SessionProviderProps
};

export const AuthProvider = ({children, disabled, sessionProviderProps}: AuthProviderProps) => {
    if (disabled == undefined || !disabled) {
        return <SessionProvider>{children}</SessionProvider>;
    }

    // When auth is disabled, we still wrap the children with a SessionProvider, but we will:
    // - set the session to `null`
    // - disable re-fetch.
    return (
        <SessionProvider session={null}
                         refetchInterval={0}
                         refetchOnWindowFocus={false}
                         refetchWhenOffline={false}>
            {children}
        </SessionProvider>
    )
}
