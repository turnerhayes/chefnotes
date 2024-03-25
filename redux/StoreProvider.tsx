import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStoreAndPersistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist";
import { setIngredients } from "./slices/available_ingredients";
import Unit from "@/app/data/units";
import { Recipe, setRecipes } from "./slices/recipes";
import { AvailableIngredient } from "@/app/data/ingredients";


export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    const persistorRef = useRef<Persistor>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        const {store, persistor} = makeStoreAndPersistor();
        storeRef.current = store;
        persistorRef.current = persistor;

        if (typeof window !== "undefined") {
            (window as any).__setTestIngredients = (ingredients: AvailableIngredient[] = []) => {
                store.dispatch(setIngredients(ingredients));
            };
            (window as any).__setTestRecipes = (recipes: Recipe[] = []) => {
                store.dispatch(setRecipes(recipes));
            };

            const subscribeHandler = () => {
                if (store.getState()._persist.rehydrated) {
                    const ingredients = store.getState().availableIngredients.items;
                    if (!ingredients || ingredients.length == 0) {
                        const TEST_INGREDIENTS: AvailableIngredient[] = [
                            {
                                ingredientId: "chicken_breast",
                                quantity: {
                                    amount: 4,
                                    unit: Unit.GRAMS,
                                },
                            },
                        ];
                        (window as any).__setTestIngredients(TEST_INGREDIENTS);

                    }
                    const recipes = store.getState().recipes.items;
                    if (!recipes || recipes.length == 0) {
                        const TEST_RECIPES: Recipe[] = [
                            {
                                id: "lemon_chicken",
                                title: "Lemon Chicken",
                                ingredients: [],
                                isSaved: false,
                                rating: 7,
                                timeEstimateMinutes: 40,
                            },
                            {
                                id: "meatloaf",
                                title: "Meatloaf",
                                ingredients: [],
                                isSaved: false,
                                rating: 8,
                                timeEstimateMinutes: 30,
                            },
                        ];
                        (window as any).__setTestRecipes(TEST_RECIPES);
                    }
                    unsubscribe();
                }
            };
            
            const unsubscribe = store.subscribe(subscribeHandler);
        }
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistorRef.current!}>
                {children}
            </PersistGate>
        </Provider>
    );
};