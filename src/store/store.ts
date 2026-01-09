import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemon";
import foundReducer from "./slices/foundSlice";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    found: foundReducer,
  },
  middleware: (getDefault) => getDefault().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
