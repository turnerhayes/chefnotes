import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";


export const getRecipesSelector = (state: RootState) => state.recipes.items;

export const getSavedRecipesSelector = createSelector(
    [
        getRecipesSelector,
    ],
    (recipes) => recipes.filter((recipe) => recipe.isSaved)
);

export const getUserAllergensSelector = (
    state: RootState
) => state.profile.allergens;

export const getUserDietaryRestrictionsSelector = (
    state: RootState
) => state.profile.dietaryRestrictions;

export const getUserKitchenToolsSelector = (
    state: RootState
) => state.profile.kitchenTools;

export const getUserNumDinersSelector = (
    state: RootState
) => state.profile.numDiners;

export const getAvailableIngredientsSelector = (
    state: RootState
) => state.availableIngredients.items;
