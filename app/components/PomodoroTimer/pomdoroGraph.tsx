"use client";
import React from "react";
import { Box } from "@chakra-ui/react";

interface PomdoroGraphProps {
  percentage: number;
}

const PomdoroGraph: React.FC<PomdoroGraphProps> = ({ percentage }) => {
  return (
    <Box backgroundColor="#ccc" height="20px" width="100%" borderRadius="10px">
      <Box
        backgroundColor="tomato"
        height="100%"
        width={`${percentage}%`}
        borderRadius="10px"
      ></Box>
    </Box>
  );
};

export default PomdoroGraph;
