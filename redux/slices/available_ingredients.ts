import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableIngredient } from "@/app/data/ingredients";


interface AvailableIngredientState {
    items: AvailableIngredient[];
}

const initialState: AvailableIngredientState = {
    items: [],
};

const slice = createSlice({
    name: "availableIngredients",
    initialState,
    reducers: {
        addIngredient(state, action: PayloadAction<AvailableIngredient>) {
            state.items.push(action.payload);
        },

        removeIngredient(state, action: PayloadAction<string>) {
            const ingredientId = action.payload;

            const index = state.items.findIndex(
                (ing) => ing.ingredientId === ingredientId
            );

            if (index < 0) {
                return;
            }

            state.items.splice(index, 1);
        },

        setIngredients(state, action: PayloadAction<AvailableIngredient[]>) {
            state.items.splice(0, state.items.length);
            state.items.push(...action.payload);
        },

        updateIngredient(
            state,
            action: PayloadAction<{
                ingredientId: AvailableIngredient["ingredientId"]} |
                Partial<AvailableIngredient>
            >
        ) {
            const ingredientIndex = state.items.findIndex(
                (ing) => ing.ingredientId === action.payload.ingredientId
            );
            if (ingredientIndex < 0) {
                throw new Error(
                    `Could not find an available ingredient with ID ${
                        action.payload.ingredientId
                    }`
                );
            }

            state.items[ingredientIndex] = {
                ...state.items[ingredientIndex],
                ...action.payload,
            };
        },
    },
});

export const {
    addIngredient,
    removeIngredient,
    setIngredients,
    updateIngredient,
} = slice.actions;

export const availableIngredientReducer = slice.reducer;
