import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProfileState {
    allergens: string[];
    dietaryRestrictions: string[];
    availableTools: string[];
    numDiners: number|null;
}

const initialState: ProfileState = {
    allergens: [],
    dietaryRestrictions: [],
    availableTools: [],
    numDiners: null,
};

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setAllergens(state, {payload}: PayloadAction<string[]>) {
            state.allergens = [...payload];
        },

        setDietaryRestrictions(state, {payload}: PayloadAction<string[]>) {
            state.dietaryRestrictions = [...payload];
        },

        setAvailableTools(state, {payload}: PayloadAction<string[]>) {
            state.availableTools = [...payload]
        },

        setNumDiners(state, {payload}: PayloadAction<number|null>) {
            state.numDiners = payload;
        }
    },
});

export const {
    setAllergens,
    setDietaryRestrictions,
    setAvailableTools,
    setNumDiners,
} = slice.actions;
export const profileReducer = slice.reducer;
