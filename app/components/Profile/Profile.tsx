import { Container, Stack, Typography } from "@mui/material";
import { DefaultSession } from "next-auth";

export const Profile = ({
    user,
}: {
    user: DefaultSession["user"]
}) => {
    return (
        <Stack>
        </Stack>
    );
};