"use client";
import PomodoroTimer from "./components/PomodoroTimer/pomodoro";
import { Center, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <div>
        <Flex
          width={"100%"}
          minH={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <PomodoroTimer
            timer={0}
            isRunning={false}
            isBreak={false}
            cycles={0}
          />
        </Flex>
      </div>
    </main>
  );
}
