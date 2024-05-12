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
      fontWeight="bold"
      color="tomato"
      marginBottom={"12.5rem"}
      marginTop={"2rem"}
      height={"4rem"}
      style={{ userSelect: "none", pointerEvents: "none" }}
    >
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </Box>
  );
};

export default PomodoroTimerDisplay;
