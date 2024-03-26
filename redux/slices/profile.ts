import Allergen from "@/app/data/allergens";
import DietaryRestriction from "@/app/data/dietary_restrictions";
import KitchenTool from "@/app/data/kitchen_tools";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProfileState {
    allergens: Allergen[];
    dietaryRestrictions: DietaryRestriction[];
    kitchenTools: KitchenTool[];
    numDiners: number|null;
}

const initialState: ProfileState = {
    allergens: [],
    dietaryRestrictions: [],
    kitchenTools: [],
    numDiners: null,
};

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setAllergens(state, {payload}: PayloadAction<Allergen[]>) {
            state.allergens = [...payload];
        },

        addAllergen(state, {payload}: PayloadAction<Allergen>) {
            if (!state.allergens.includes(payload)) {
                state.allergens.push(payload);
            }
        },

        removeAllergen(state, {payload}: PayloadAction<Allergen>) {
            const index = state.allergens.findIndex(
                (allergen) => allergen === payload
            );

            if (index < 0) {
                throw new Error(`Error in removeAllergen action: allergen ${
                    payload
                } was not found`);
            }

            state.allergens.splice(index, 1);
        },

        setDietaryRestrictions(
            state,
            {payload}: PayloadAction<DietaryRestriction[]>
        ) {
            state.dietaryRestrictions = [...payload];
        },

        addDietaryRestriction(
            state,
            {payload}: PayloadAction<DietaryRestriction>
        ) {
            if (!state.dietaryRestrictions.includes(payload)) {
                state.dietaryRestrictions.push(payload);
            }
        },

        removeDietaryRestriction(
            state,
            {payload}: PayloadAction<DietaryRestriction>
        ) {
            const index = state.dietaryRestrictions.findIndex(
                (restriction) => restriction === payload
            );

            if (index < 0) {
                throw new Error(
                    `Error in removeDietaryRestriction action: allergen ${
                        payload
                    } was not found`
                );
            }

            state.dietaryRestrictions.splice(index, 1);
        },

        setAvailableTools(state, {payload}: PayloadAction<KitchenTool[]>) {
            state.kitchenTools = [...payload];
        },

        addKitchenTool(state, {payload}: PayloadAction<KitchenTool>) {
            if (!state.kitchenTools.includes(payload)) {
                state.kitchenTools.push(payload);
            }
        },

        removeKitchenTool(
            state,
            {payload}: PayloadAction<KitchenTool>
        ) {
            const index = state.kitchenTools.findIndex(
                (tool) => tool === payload
            );

            if (index < 0) {
                throw new Error(
                    `Error in removeKitchenTool action: tool ${
                        payload
                    } was not found`
                );
            }

            state.kitchenTools.splice(index, 1);
        },

        setNumDiners(state, {payload}: PayloadAction<number|null>) {
            state.numDiners = payload;
        }
    },
});

export const {
    setAllergens,
    addAllergen,
    removeAllergen,
    setDietaryRestrictions,
    addDietaryRestriction,
    removeDietaryRestriction,
    setAvailableTools,
    addKitchenTool,
    removeKitchenTool,
    setNumDiners,
} = slice.actions;
export const profileReducer = slice.reducer;
