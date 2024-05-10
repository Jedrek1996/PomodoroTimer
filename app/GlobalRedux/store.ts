"use client";
import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "../GlobalRedux/Features/timerSlice";

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
