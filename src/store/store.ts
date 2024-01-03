import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import navigationSlice from "./navigation-slice";
import citiesSlice from "./cities-slice";

export const store = configureStore({
  reducer: {
    navigation: navigationSlice.reducer,
    cities: citiesSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
