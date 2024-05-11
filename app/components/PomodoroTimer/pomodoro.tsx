"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AppStore } from "../../GlobalRedux/store";
import { useDispatch, useSelector } from "react-redux";
import { TimerState } from "../../GlobalRedux/Features/timerSlice";
import {
  startTimer,
  pauseTimer,
  resetTimer,
  endTimer,
  tick,
  startBreak,
  pauseBreakTimer,
  resumeBreakTimer,
  endBreak,
} from "../../GlobalRedux/Features/timerSlice";
import "./pomodoro.css";
import PomodoroButtons from "./pomdoroButtons";
import PomdoroGraph from "./pomdoroGraph";
import PomodoroTimerDisplay from "./pomdoroTimer";
import PomodoroHeading from "./pomdoroHeading";
import PomdoroCycles from "./pomodoroCycles";
import { TIMER_CONSTANTS } from "../../constants/constants";

const PomodoroTimer: React.FC<TimerState> = () => {
  let intervalId: NodeJS.Timeout;
  const standardTimer: number = 60 * 25;
  const breakTimer: number = 60 * 5;

  const dispatch = useDispatch();
  const { timer, isRunning, isBreak, cycles } = useSelector(
    (state: AppStore) => state.timer
  );
  const [localTimer, setLocalTimer] = useState<number>(timer);

  // Calling dispatch tick to increament
  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        dispatch(tick());
        setLocalTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, isBreak, dispatch]);

  //Set actions after timer ends
  useEffect(() => {
    setLocalTimer(timer);
    if (isBreak && timer >= breakTimer) {
      dispatch(endBreak());
      dispatch(startTimer());
    } else if (isRunning && timer >= standardTimer) {
      dispatch(endTimer());
      dispatch(startBreak());
    }
  }, [timer]);

  // Dispatch actions depending on current timer, pause and resume.
  const handleStartPause = (): void => {
    let action;
    if (isRunning) {
      action = pauseTimer();
    } else if (isBreak && isRunning) {
      action = pauseBreakTimer();
    } else if (isBreak && !isRunning) {
      action = resumeBreakTimer();
    } else {
      action = startTimer();
    }
    dispatch(action);
  };

  //Reset logic
  const handleReset = (): void => {
    dispatch(resetTimer());
    setLocalTimer(timer);
  };

  //Graph logic
  let remainingPercentage: number;

  if (isRunning || isBreak) {
    remainingPercentage = isBreak
      ? (localTimer / breakTimer) * 100
      : (localTimer / standardTimer) * 100;
  } else {
    remainingPercentage = (localTimer / standardTimer) * 100;
    if (isBreak && localTimer === 0) {
      dispatch(endBreak());
    }
  }

  return (
    <Box className="pomodoroContainer">
      <PomodoroHeading />
      <PomdoroGraph percentage={remainingPercentage} />

      <Flex flexDirection={"column"}>
        <PomodoroTimerDisplay localTimer={localTimer} />

        <PomodoroButtons
          isRunning={isRunning}
          handleStartPause={handleStartPause}
          handleReset={handleReset}
        />
        <PomdoroCycles isBreak={isBreak} cycles={cycles} />
      </Flex>
    </Box>
  );
};

export default PomodoroTimer;
