"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import "./pomodoro.css";

interface PomodoroTimerDisplayProps {
  localTimer: number;
}

const PomodoroTimerDisplay: React.FC<PomodoroTimerDisplayProps> = ({
  localTimer,
}) => {
  const minutes = Math.floor(localTimer / 60);
  const seconds = localTimer % 60;

  return (
    <Box
      className="custom-pomTimer"
      // fontSize={["1rem", "1.5rem", "2rem", "2.5rem", "3rem", "10rem"]}
      fontWeight="bold"
      color="tomato"
      marginBottom={"12.5rem"}
      marginTop={"2rem"}
      height={"4rem"}
    >
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </Box>
  );
};

export default PomodoroTimerDisplay;
