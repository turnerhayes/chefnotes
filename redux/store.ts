import { configureStore } from "@reduxjs/toolkit";
import { availableIngredientReducer } from "./slices/available_ingredients";
import { profileReducer } from "./slices/profile";

export const makeStore = () => {
    return configureStore({
      reducer: {
        availableIngredients: availableIngredientReducer,
        profile: profileReducer,
      },
    });
  };
  
  export type AppStore = ReturnType<typeof makeStore>;
  export type RootState = ReturnType<AppStore['getState']>;
  export type AppDispatch = AppStore['dispatch'];