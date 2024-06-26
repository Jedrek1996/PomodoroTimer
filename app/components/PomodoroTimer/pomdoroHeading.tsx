import React from "react";
import { Heading } from "@chakra-ui/react";
import { TIMER_CONSTANTS } from "../../constants/constants";
import "./pomodoro.css";

const PomodoroHeading: React.FC = () => {
  return (
    <Heading
      className="custom-pomHeader"
      color={"grey"}
      fontWeight={"thin"}
      textTransform={"uppercase"}
      style={{ userSelect: "none", pointerEvents: "none" }}
    >
      {TIMER_CONSTANTS.HEADER}
    </Heading>
  );
};

export default PomodoroHeading;
