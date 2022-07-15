import { Slider } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { isFinishedAtom } from "../../atoms/state.atom";
import { DEFAULT_TIME } from "../../utils/wordGenerator/wordGenerator.config";
import { TimerProps } from "./Timer.definition";

export const Timer = (props: TimerProps) => {
  const { isRunning, onStart, onFinish, ...sliderProps } = props;

  const router = useRouter();
  const { t } = router.query;
  const time = useMemo(() => parseInt(t as string) || DEFAULT_TIME, [t]);

  const [currentTime, setCurrentTime] = useState(0);
  const interval = useInterval(() => setCurrentTime((s) => s + 1), 1000);

  const [, setIsFinished] = useAtom(isFinishedAtom);

  useEffect(() => {
    isRunning ? interval.start() : interval.stop();
    return interval.stop;
  }, [isRunning]);

  useEffect(() => {
    if (currentTime >= time) {
      onFinish?.();
      setIsFinished(true);
    }
  }, [currentTime, time, onFinish]);

  return <Slider {...sliderProps} min={0} max={time} value={time - currentTime} />;
};
