import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { campaignSlice } from "./campaign";
import { userSlice } from "./user";
import { reportingSlice } from "./reporting";
import { formSlice } from "./form";

export const store = configureStore({
  reducer: {
    campaign: campaignSlice.reducer,
    user: userSlice.reducer,
    reporting: reportingSlice.reducer,
    form: formSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
