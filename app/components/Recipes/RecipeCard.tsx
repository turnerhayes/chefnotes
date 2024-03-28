import { useCallback } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import FoodIcon from "@mui/icons-material/LocalDining";
import { Recipe } from "@/redux/slices/recipes";
import Link from "next/link";

export interface RecipeCardProps {
    recipe: Recipe;
    onClick: (recipe: Recipe) => void;
    onToggleSaved: (recipe: Recipe, isSaved: boolean) => void;
}


export const RecipeCard = ({
    recipe,
    onClick,
    onToggleSaved,
}: RecipeCardProps) => {
    const handleClick = useCallback(() => {
        onClick(recipe);
    }, [onClick, recipe]);

    const handleSaveButtonClick = useCallback(() => {
        onToggleSaved(recipe, !recipe.isSaved);
    }, [
        onToggleSaved,
        recipe,
    ]);

    const theme = useTheme();

    return (
        <Stack
            height="100%"
        >
            <Stack flexGrow={1}>
                <Stack
                    direction="row"
                    component="header"
                    justifyContent="space-between"
                >
                    <IconButton onClick={handleSaveButtonClick}>
                        <BookmarkIcon
                            color={
                                recipe.isSaved ?
                                    "primary" :
                                    "action"
                            }
                        />
                    </IconButton>
                    <Stack
                        alignItems="flex-end"
                        paddingRight={1}
                        paddingTop={1}
                    >
                        <Typography variant="caption">
                            {recipe.timeEstimateMinutes} min
                        </Typography>
                        <Stack direction="row">
                            <StarIcon
                                fontSize="small"
                                htmlColor="gold"
                            />
                            <Typography variant="caption">
                                {recipe.rating}/10
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    flexGrow={1}
                    onClick={handleClick}
                    component={Link}
                    href={`/recipes/${recipe.id}`}
                    sx={{
                        textDecoration: "none",
                        color: theme.palette.action.active,
                    }}
                >
                    <Stack
                        flexGrow={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <FoodIcon
                            sx={{fontSize: 70}}
                        />
                    </Stack>
                    <Divider />
                    <Stack
                        component="footer"
                        sx={{
                            padding: 1,
                            height: "37%",
                        }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            variant="h5"
                            align="center"
                        >
                            {recipe.title}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
