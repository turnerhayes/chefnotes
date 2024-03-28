"use client";

import { useCallback, useState } from "react";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppSelector } from "@/redux/hooks";
import { MyIngredientsList } from "./MyIngredientsList";
import { RecipeList } from "./RecipeList";
import { getRecipesSelector } from "@/redux/selectors";


enum TabName {
    CHEFS_RECIPES = "chefs_recipes",
    MY_INGREDIENTS = "my_ingredients",
}

export const Recipes = () => {
    const [selectedTab, setSelectedTab] = useState(TabName.CHEFS_RECIPES);
    const recipes = useAppSelector(getRecipesSelector);

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
                    <RecipeList
                        recipes={recipes}
                    />
                </TabPanel>
                <TabPanel value={TabName.MY_INGREDIENTS} sx={{padding: 1}}>
                    <MyIngredientsList />
                </TabPanel>
            </TabContext>
        </Stack>
    );
};
