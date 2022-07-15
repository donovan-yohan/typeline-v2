import { SliderProps } from "@mantine/core";

export interface TimerProps extends SliderProps {
  isRunning: boolean;
  onFinish?: () => void;
  onStart?: () => void;
}
