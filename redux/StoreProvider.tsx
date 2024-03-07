import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore, makeStoreAndPersistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist";

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
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistorRef.current!}>
                {children}
            </PersistGate>
        </Provider>
    );
};