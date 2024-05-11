import React from "react";
import { Heading } from "@chakra-ui/react";
import { TIMER_CONSTANTS } from "../../constants/constants";

const PomodoroHeading: React.FC = () => {
  return (
    <Heading
      color={"grey"}
      fontWeight={"thin"}
      textTransform={"uppercase"}
      fontSize={"2.7rem"}
    >
      {TIMER_CONSTANTS.HEADER}
    </Heading>
  );
};

export default PomodoroHeading;
