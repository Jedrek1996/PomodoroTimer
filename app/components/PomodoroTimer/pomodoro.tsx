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
  tick,
  startBreak,
} from "../../GlobalRedux/Features/timerSlice";
import "./podmoro.css";
import PomodoroButtons from "./pomdoroButtons";
import toast from "react-hot-toast";

const PomodoroTimer: React.FC<TimerState> = () => {
  let intervalId: NodeJS.Timeout;
  const dispatch = useDispatch();
  const { timer, isRunning, isBreak, cycles } = useSelector(
    (state: AppStore) => state.timer
  );
  const [localTimer, setLocalTimer] = useState(timer);

  useEffect(() => {
    setLocalTimer(timer);
    console.log(timer);
    timer >= 60 * 25 && dispatch(startBreak());
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
  }, [isRunning, dispatch]);

  const handleStartPause = () => {
    const action = isRunning ? pauseTimer() : startTimer();
    dispatch(action);
  };

  const handleReset = () => {
    dispatch(resetTimer());
    setLocalTimer(timer);
    toast.error("Timer has been resetted!");
  };

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

      <Flex flexDirection={"column"}>
        <Text
          fontSize="10rem"
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
