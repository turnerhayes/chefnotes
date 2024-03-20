import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStoreAndPersistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist";
import { AvailableIngredient, setIngredients } from "./slices/available_ingredients";
import Category from "@/app/data/categories";
import Unit from "@/app/data/units";


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
            
            store.subscribe(() => {
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
                }
            });
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