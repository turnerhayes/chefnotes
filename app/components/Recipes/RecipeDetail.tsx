"use client";

import { useAppSelector } from "@/redux/hooks";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";


export const RecipeDetail = ({
    recipeId,
}: {
    recipeId: string;
}) => {
    const recipe = useAppSelector(
        (state) => state.recipes.items.find((rec) => rec.id === recipeId)
    );
  
    if (!recipe) {
      throw new Error(`No recipe found for ID ${recipeId}`);
    }
  

    return (
        <Stack>
            <header>
                <Typography variant="h3" align="center">
                    {recipe.title}
                </Typography>
            </header>
        </Stack>
    );
};
