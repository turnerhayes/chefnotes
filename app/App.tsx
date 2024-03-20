"use client";

import { SessionProvider } from "next-auth/react";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import {common} from "@mui/material/colors";
import StoreProvider from "@/redux/StoreProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export const App = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const theme = createTheme({
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: common.white,
                        color: common.black,
                    },
                },
            },
        },
        // palette: {
        //     primary: {
        //         main: common.white,
        //     },
        // },
    });

    return (
        <SessionProvider>
            <StoreProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeProvider theme={theme}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            height="100vh"
                            width="100vw"
                            component="main"
                        >
                            {children}
                        </Stack>
                    </ThemeProvider>
                </LocalizationProvider>
            </StoreProvider>
        </SessionProvider>
    );
};
