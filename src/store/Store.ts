import { configureStore } from "@reduxjs/toolkit";
import AppStateReducer  from "./slices/AppState-slice";

const Store = configureStore({
    reducer: {
        AppStateReduder : AppStateReducer,
    }
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatcher = typeof Store.dispatch;