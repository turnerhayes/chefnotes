"use client";

import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import FoodIcon from "@mui/icons-material/LocalDining";
import { Recipe, setRecipeSaved } from "@/redux/slices/recipes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MyIngredientsList } from "./MyIngredientsList";


enum TabName {
    CHEFS_RECIPES = "chefs_recipes",
    MY_INGREDIENTS = "my_ingredients",
}

const NoRecipes = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <Typography variant="h4" align="center">
                No recipes available yet.
            </Typography>
        </Stack>
    );
};

interface RecipeCardProps {
    recipe: Recipe;
    onClick: (recipe: Recipe) => void;
    onToggleSaved: (recipe: Recipe, isSaved: boolean) => void;
}

const RecipeCard = ({
    recipe,
    onClick,
    onToggleSaved,
}: RecipeCardProps) => {
    const handleClick = useCallback(() => {
        onClick(recipe);
    }, [onClick]);

    const handleSaveButtonClick = useCallback((event: MouseEvent) => {
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


const RecipeList = ({
    recipes,
    onRecipeClicked,
    onToggleRecipeSaved,
}:{
    recipes: Recipe[];
    onRecipeClicked: RecipeCardProps["onClick"];
    onToggleRecipeSaved: RecipeCardProps["onToggleSaved"];
}) => {
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
                                onClick={onRecipeClicked}
                                onToggleSaved={onToggleRecipeSaved}
                            />
                        </Paper>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export const Recipes = () => {
    const [selectedTab, setSelectedTab] = useState(TabName.CHEFS_RECIPES);
    const dispatch = useAppDispatch();
    const recipes = useAppSelector((state) => state.recipes.items);

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

    const handleTabChange = useCallback((event: unknown, value: TabName) => {
        setSelectedTab(value);
    }, [setSelectedTab]);

    return (
        <Stack>
            <TabContext value={selectedTab}>
                <TabList onChange={handleTabChange} variant="fullWidth">
                    <Tab label="Chef's Recipes" value={TabName.CHEFS_RECIPES} />
                    <Tab label="My Ingredients" value={TabName.MY_INGREDIENTS} />
                </TabList>
                <TabPanel value={TabName.CHEFS_RECIPES} sx={{padding: 1}}>
                    {
                        recipes.length === 0 ?
                            (
                                <NoRecipes />
                            ): (
                                <RecipeList
                                    recipes={recipes}
                                    onRecipeClicked={handleRecipeClicked}
                                    onToggleRecipeSaved={
                                        handleToggleRecipeSaved
                                    }
                                />
                            )
                    }
                </TabPanel>
                <TabPanel value={TabName.MY_INGREDIENTS} sx={{padding: 1}}>
                    <MyIngredientsList />
                </TabPanel>
            </TabContext>
        </Stack>
    );
};
