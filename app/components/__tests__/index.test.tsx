import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PomodoroTimer from "@/app/components/PomodoroTimer/pomodoro";
import { configureStore } from "@reduxjs/toolkit";
import { timerSlice, TimerState } from "../../GlobalRedux/Features/timerSlice";

describe("PomodoroTimer component", () => {
  test("renders Pomodoro Timer heading", () => {
    const store = configureStore({
      reducer: {
        timer: timerSlice.reducer,
      },
    });

    const mockTimerState: TimerState = {
      timer: 1500,
      isRunning: false,
      isBreak: false,
      cycles: 0,
    };

    render(
      <Provider store={store}>
        <PomodoroTimer {...mockTimerState} />
      </Provider>
    );

    const headingElement = screen.getByText(/Pomodoro Timer/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("displays correct time format", () => {
    const store = configureStore({
      reducer: {
        timer: timerSlice.reducer,
      },
    });

    const mockTimerState: TimerState = {
      timer: 0,
      isRunning: false,
      isBreak: false,
      cycles: 0,
    };

    render(
      <Provider store={store}>
        <PomodoroTimer {...mockTimerState} />
      </Provider>
    );

    const timeElement = screen.getByText(/0:00/i);
    expect(timeElement).toBeInTheDocument();
  });

  test("starts and pauses the timer when Start/Pause button is clicked", async () => {
    const store = configureStore({
      reducer: {
        timer: timerSlice.reducer,
      },
    });

    const mockTimerState: TimerState = {
      timer: 1500,
      isRunning: false,
      isBreak: false,
      cycles: 0,
    };

    render(
      <Provider store={store}>
        <PomodoroTimer {...mockTimerState} />
      </Provider>
    );

    const startPauseButton = screen.getByTestId("start-pause-button");

    // Click the button to start the timer
    fireEvent.click(startPauseButton);

    // Wait for the timer to update
    await waitFor(() => {
      const timeElement = screen.getByText(/24:59/i);
      expect(timeElement).toBeInTheDocument();
    });

    // Click the button again to pause the timer
    fireEvent.click(startPauseButton);

    // The timer should remain at the same value
    const timeElement = screen.getByText(/24:59/i);
    expect(timeElement).toBeInTheDocument();
  });

  test("resets the timer when Reset button is clicked", () => {
    const store = configureStore({
      reducer: {
        timer: timerSlice.reducer,
      },
    });

    const mockTimerState: TimerState = {
      timer: 1500,
      isRunning: true,
      isBreak: false,
      cycles: 0,
    };

    render(
      <Provider store={store}>
        <PomodoroTimer {...mockTimerState} />
      </Provider>
    );

    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);
  });
});
