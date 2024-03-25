import { Ingredient, Quantity } from "@/app/data/ingredients";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface RecipeIngredient extends Ingredient {
    quantity: Quantity;
}

export interface Recipe {
    id: string;
    title: string;
    ingredients: RecipeIngredient[];
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
        addRecipe(state, action: PayloadAction<Recipe>) {
            state.items.push(action.payload);
        },

        setRecipes(state, action: PayloadAction<Recipe[]>) {
            state.items = action.payload;
        },

        setRecipeSaved(state, action: PayloadAction<{
            recipeId: string;
            isSaved: boolean;
        }>) {
            const {recipeId, isSaved} = action.payload;
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
