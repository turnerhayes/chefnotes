import { Recipe, setRecipeSaved } from "@/redux/slices/recipes";
import { RecipeCard, RecipeCardProps } from "./RecipeCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


const NoRecipes = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <Typography variant="h4" align="center">
                No recipes available yet.
            </Typography>
        </Stack>
    );
};

export const RecipeList = ({
    recipes,
}:{
    recipes: Recipe[];
}) => {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleRecipeClicked = useCallback((recipe: Recipe) => {
        router.push(`/recipes/${recipe.id}`);
    }, [
        router,
    ]);

    const handleToggleRecipeSaved = useCallback((recipe: Recipe, isSaved: boolean) => {
        dispatch(setRecipeSaved({
            recipeId: recipe.id,
            isSaved,
        }));
    }, [
        dispatch,
    ]);

    if (recipes.length === 0) {
        return (<NoRecipes />);
    }

    return (
        <Grid
            container
            justifyContent="space-around"
        >
            {
                recipes.map((recipe) => (
                    <Grid item key={recipe.id}>
                        <Paper
                            sx={{
                                height: '14em',
                                width: '11em',
                            }}
                        >
                            <RecipeCard
                                recipe={recipe}
                                onClick={handleRecipeClicked}
                                onToggleSaved={handleToggleRecipeSaved}
                            />
                        </Paper>
                    </Grid>
                ))
            }
        </Grid>
    );
};
