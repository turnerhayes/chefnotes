"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RecipeList } from "@/app/components/Recipes/RecipeList";
import { useAppSelector } from "@/redux/hooks";

export const SavedRecipes = () => {
    const recipes = useAppSelector(
        (state) => state.recipes.items.filter((rec) => rec.isSaved)
    );

    return (
        <Stack
            paddingTop={2}
        >
            <RecipeList
                recipes={recipes}
            />
        </Stack>
    );
};