"use client";
import React from "react";
import { Text } from "@chakra-ui/react";

interface PomodoroTimerDisplayProps {
  localTimer: number;
}

const PomodoroTimerDisplay: React.FC<PomodoroTimerDisplayProps> = ({
  localTimer,
}) => {
  const minutes = Math.floor(localTimer / 60);
  const seconds = localTimer % 60;

  return (
    <Text
      fontSize={["1rem", "1.5rem", "2rem", "2.5rem", "3rem", "10rem"]}
      fontWeight="bold"
      color="tomato"
      marginBottom={"12.5rem"}
      marginTop={"2rem"}
      height={"4rem"}
    >
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </Text>
  );
};

export default PomodoroTimerDisplay;
