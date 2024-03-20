import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { availableIngredientReducer } from "./slices/available_ingredients";
import { profileReducer } from "./slices/profile";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";


const combinedReducers = combineReducers(
  {
    availableIngredients: availableIngredientReducer,
    profile: profileReducer,
  },
);

type SliceReducersState = ReturnType<typeof combinedReducers>;

const persistConfig: PersistConfig<SliceReducersState> = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = persistReducer(persistConfig, combinedReducers);

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
        },
      });
    },
  });

  return store;
};

export const makeStoreAndPersistor = () => {
  const store = makeStore();
  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];