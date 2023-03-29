import {configureStore} from '@reduxjs/toolkit';
import {emptySplitApi} from "./empty.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import logger from 'redux-logger';
import {socketSlice} from "./socket.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        socket: socketSlice.reducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(emptySplitApi.middleware)
            .concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// This is to infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// This is to infer types from the store itself
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;