"use client";

import { SessionProvider } from "next-auth/react";
import { Stack } from "@mui/material";
import StoreProvider from "@/redux/StoreProvider";

export const App = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <SessionProvider>
            <StoreProvider>
                <Stack
                    direction="column"
                    alignItems="center"
                    height="100vh"
                    width="100vw"
                    component="main"
                >
                    {children}
                </Stack>
            </StoreProvider>
        </SessionProvider>
    );
};
