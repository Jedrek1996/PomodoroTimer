"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
  timer: number;
  isRunning: boolean;
  isBreak: boolean;
  cycles: number;
}

const initialState: TimerState = {
  timer: 24 * 60 + 55,
  isRunning: false,
  isBreak: false,
  cycles: 0,
};

export const timerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    startTimer: (state) => {
      console.log("startTimer Reducer Clicked ▶️");
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      console.log("pauseTimer Reducer Clicked ⏸️");
      state.isRunning = false;
    },
    resetTimer: () => {
      console.log("resetTimer Reducer Clicked ❌");
      return initialState;
    },
    tick: (state) => {
      if (state.isRunning) {
        state.timer += 1;
        state.isRunning = true;
      }
    },
    startBreak: (state) => {
      console.log("startTimer Clicked🍇");
      state.timer = 0;
      state.isBreak = true;
      state.cycles += 1;
    },
  },
});

export const { startTimer, pauseTimer, resetTimer, tick, startBreak } =
  timerSlice.actions;
