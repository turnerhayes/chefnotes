"use client";

import { SessionProvider } from "next-auth/react";
import { Stack } from "@mui/material";

export const App = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <SessionProvider>
            <Stack
                direction="column"
                alignItems="center"
                height="100vh"
                width="100vw"
                component="main"
            >
                {children}
            </Stack>
        </SessionProvider>
    );
};
