import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import reduxStorage from "./storage";
import userInfoReducer from "./reducers/userInfoReducer";
import statesReducer from "./reducers/getStatesReducer";
import collectionReducer from "./reducers/getCollectionReducer";


const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    statesReducer: statesReducer,
    collectionReducer: collectionReducer
});

const persistConfig = {
    key: "root",
    storage: reduxStorage,
    whitelist: ["userInfo"],
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    // devTools: true
});

const persistor = persistStore(store);

export { store, persistor };
