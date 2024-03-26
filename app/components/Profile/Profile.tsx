import { DefaultSession } from "next-auth";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";


const ProfileImage = () => {
    const avatarSize = 60;

    return (
        <Avatar
            sx={{
                width: avatarSize,
                height: avatarSize,
            }}
        >
            <PersonIcon
            />
        </Avatar>
    );
};

const NavListItem = ({
    children,
    href,
}: {
    children: string;
    href: string;
}) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton>
                    <ChevronRightIcon />
                </IconButton>
            }
        >
            <ListItemButton component={Link} href={href}>
                <ListItemText
                    primaryTypographyProps={{
                        variant: "h5",
                    }}
                >
                    {children}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

export const Profile = ({
    user,
}: {
    user: NonNullable<DefaultSession["user"]>
}) => {
    return (
        <Stack>
            <Stack
                alignItems="center"
                paddingTop={4}
            >
                <ProfileImage
                />
                <Typography variant="h3" align="center">
                    {user.name}
                </Typography>
            </Stack>
            <List
                sx={{paddingTop: 8}}
            >
                <NavListItem
                    href="/profile/recipes"
                >
                    Saved Recipes
                </NavListItem>
                <NavListItem
                    href="/profile/diet"
                >
                    Dietary Preferences
                </NavListItem>
                <NavListItem
                    href="/profile/equipment"
                >
                    Kitchen Equipment
                </NavListItem>
            </List>
        </Stack>
    );
};