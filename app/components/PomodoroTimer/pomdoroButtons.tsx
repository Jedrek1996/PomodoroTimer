import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";

interface PomodoroButtonsProps {
  isRunning: boolean;
  handleStartPause: () => void;
  handleReset: () => void;
}

const PomodoroButtons: React.FC<PomodoroButtonsProps> = ({
  isRunning,
  handleStartPause,
  handleReset,
}) => {
  return (
    <>
      <Tooltip
        label={isRunning ? "Pause" : "Play"}
        placement="top"
        color={"grey"}
      >
        <Button
          onClick={handleStartPause}
          fontSize={"4rem"}
          background={"transparent"}
          border={"none"}
          cursor={"pointer"}
          color={"grey"}
          transition="all 1s"
          _hover={{ color: isRunning ? "red" : "green" }}
        >
          {isRunning ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
        </Button>
      </Tooltip>

      <Tooltip label="Reset" placement="top" color={"grey"}>
        <Button
          onClick={handleReset}
          cursor={"pointer"}
          fontSize={"3.5rem"}
          background={"transparent"}
          marginBottom={"4px"}
          border={"none"}
          color={"grey"}
          transition="all 0.2s"
          _hover={{ color: "#000000b3" }}
        >
          <LuTimerReset />
        </Button>
      </Tooltip>
    </>
  );
};

export default PomodoroButtons;
