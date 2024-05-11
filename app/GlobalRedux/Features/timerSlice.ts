"use client";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { TIMER_CONSTANTS } from "../../constants/constants";

export interface TimerState {
  timer: number;
  isRunning: boolean;
  isBreak: boolean;
  cycles: number;
}

const initialState: TimerState = {
  timer: 0,
  isRunning: false,
  isBreak: false,
  cycles: 0,
};

const pomodoroErrorAlert = "/sounds/pomodoroSuccessAlert.wav";
const pomodoroSuccessAlert = "/sounds/pomodoroErrorAlert.wav";

export const timerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
      toast.success(TIMER_CONSTANTS.START);
      new Audio(pomodoroSuccessAlert).play();
    },
    pauseTimer: (state) => {
      state.isRunning = false;
      toast.error(TIMER_CONSTANTS.PAUSE);
      new Audio(pomodoroErrorAlert).play();
    },
    resetTimer: (state) => {
      toast.error(TIMER_CONSTANTS.RESET);
      state.timer = 0;
      state.isRunning = false;
      state.isBreak = false;
      new Audio(pomodoroErrorAlert).play();
    },
    endTimer: (state) => {
      state.timer = 0;
      state.isRunning = false;
      new Audio(pomodoroErrorAlert).play();
    },
    tick: (state) => {
      if (state.isRunning || state.isBreak) {
        state.timer += 1;
      }
    },
    startBreak: (state) => {
      toast.success(TIMER_CONSTANTS.BREAK);
      state.isRunning = true;
      state.timer = 0;
      state.isBreak = true;
      state.cycles += 1;
      new Audio(pomodoroSuccessAlert).play();
    },
    pauseBreakTimer: (state) => {
      state.isBreak = false;
      new Audio(pomodoroErrorAlert).play();
    },
    resumeBreakTimer: (state) => {
      state.isBreak = true;
      state.isRunning = true;
      new Audio(pomodoroSuccessAlert).play();
    },
    endBreak: (state) => {
      toast.error(TIMER_CONSTANTS.BREAK_END);
      state.timer = 0;
      state.isBreak = false;
      state.isRunning = true;
      new Audio(pomodoroErrorAlert).play();
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  endTimer,
  tick,
  startBreak,
  pauseBreakTimer,
  resumeBreakTimer,
  endBreak,
} = timerSlice.actions;
