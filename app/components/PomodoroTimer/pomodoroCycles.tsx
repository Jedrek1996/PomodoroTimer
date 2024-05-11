import React from "react";
import { Text } from "@chakra-ui/react";

interface PomdoroCyclesProps {
  isBreak: boolean;
  cycles: number;
}

const PomdoroCycles: React.FC<PomdoroCyclesProps> = ({ isBreak, cycles }) => {
  return (
    <Text mt={4} color={"grey"} fontSize={"1.2rem"} margin={"1.5rem"}>
      {isBreak ? "Break Mode" : "Work Mode"} | Completed Cycles: {cycles}
    </Text>
  );
};

export default PomdoroCycles;
