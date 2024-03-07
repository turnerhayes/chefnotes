import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quantity {
    amount: number;
    unit?: string;
}

interface AvailableIngredient {
    name: string;
    quantity: Quantity;
}

interface AvailableIngredientState {
    items: AvailableIngredient[];
}

const initialState: AvailableIngredientState = {
    items: [],
};

const slice = createSlice({
    name: "available-ingredients",
    initialState,
    reducers: {
        addIngredient(state, action: PayloadAction<AvailableIngredient>) {
            state.items.push(action.payload);
        },
    },
});

export const {addIngredient} = slice.actions;

export const availableIngredientReducer = slice.reducer;
