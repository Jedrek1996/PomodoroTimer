"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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

const PomodoroTimer: React.FC<TimerState> = () => {
  let intervalId: NodeJS.Timeout;
  const standardTimer: number = 60 * 25;
  const breakTimer: number = 60 * 5;

  const dispatch = useDispatch();
  const { timer, isRunning, isBreak, cycles } = useSelector(
    (state: AppStore) => state.timer
  );
  const [localTimer, setLocalTimer] = useState<number>(timer);

  console.log("isRunning✨✨" + isRunning);
  console.log("isBreak🍇 " + isBreak);
  console.log("Timer: " + timer);

  useEffect(() => {
    setLocalTimer(timer);
    if (isBreak && timer >= breakTimer) {
      dispatch(endBreak());
      dispatch(startTimer());
    }

    if (isRunning && timer >= standardTimer) {
      dispatch(endTimer());
      dispatch(startBreak());
    }
  }, [timer]);

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

  const handleReset = (): void => {
    dispatch(resetTimer());
    setLocalTimer(timer);
  };

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
      <Heading
        color={"grey"}
        fontWeight={"thin"}
        textTransform={"uppercase"}
        fontSize={"2.7rem"}
      >
        Pomodoro Timer
      </Heading>

      <Box
        backgroundColor="#ccc"
        height="20px"
        width="100%"
        borderRadius="10px"
      >
        <Box
          backgroundColor="tomato"
          height="100%"
          width={`${remainingPercentage}%`}
          borderRadius="10px"
        ></Box>
      </Box>

      <Flex flexDirection={"column"}>
        <Text
          fontSize={["1rem", "1.5rem", "2rem", "2.5rem", "3rem", "10rem"]}
          fontWeight="bold"
          color="tomato"
          marginBottom={"12.5rem"}
          marginTop={"2rem"}
          height={"4rem"}
        >
          {Math.floor(localTimer / 60)}:{localTimer % 60 < 10 ? "0" : ""}
          {localTimer % 60}
        </Text>

        <Flex
          align={"center"}
          justify={"center"}
          justifyContent={"space-between"}
          margin={"0 auto"}
          width={"12rem"}
        >
          <PomodoroButtons
            isRunning={isRunning}
            isBreak={isBreak}
            handleStartPause={handleStartPause}
            handleReset={handleReset}
          />
        </Flex>

        <Text mt={4} color={"grey"} fontSize={"1.2rem"} margin={"1.5rem"}>
          {isBreak ? "Break Mode" : "Work Mode"} | Completed Cycles: {cycles}
        </Text>
      </Flex>
    </Box>
  );
};

export default PomodoroTimer;
