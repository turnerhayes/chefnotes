import { QuantifiedIngredient } from "@/app/data/ingredients";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Recipe {
    id: string;
    title: string;
    ingredients: QuantifiedIngredient[];
    isSaved: boolean;
    rating: number;
    timeEstimateMinutes: number;
}

interface RecipesState {
    items: Recipe[];
}

const initialState: RecipesState = {
    items: [],
};

const slice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe(state, {payload}: PayloadAction<Recipe>) {
            state.items.push(payload);
        },

        setRecipes(state, {payload}: PayloadAction<Recipe[]>) {
            state.items = payload;
        },

        setRecipeSaved(state, {payload: {recipeId, isSaved}}: PayloadAction<{
            recipeId: string;
            isSaved: boolean;
        }>) {
            const recipe = state.items.find(
                (r) => r.id === recipeId
            );

            if (!recipe) {
                throw new Error(
                    `Error in setRecipeSaved action: no recipe found with ID "${
                        recipeId
                    }"`);
            }
            recipe.isSaved = isSaved;
        }
    },
});

export const {
    addRecipe,
    setRecipes,
    setRecipeSaved,
} = slice.actions;

export const recipesReducer = slice.reducer;
