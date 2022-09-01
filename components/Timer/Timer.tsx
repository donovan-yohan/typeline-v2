import { Slider } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { isFinishedAtom, totalTimeAtom } from "../../atoms/state.atom";
import { formatTime } from "../../utils/utils";
import { DEFAULT_TIME } from "../../utils/wordGenerator/wordGenerator.config";
import { TimerProps } from "./Timer.definition";
import { useStyles } from "./Timer.style";

export const Timer = (props: TimerProps) => {
  const { isRunning, onFinish, ...sliderProps } = props;
  const { classes } = useStyles();

  const router = useRouter();
  const { t } = router.query;
  const time = useMemo(() => parseInt(t as string) || DEFAULT_TIME, [t]);

  const [currentTime, setCurrentTime] = useState(0);
  const interval = useInterval(() => setCurrentTime((s) => s + 1), 1000);

  const [, setIsFinished] = useAtom(isFinishedAtom);
  const [, setTotalTime] = useAtom(totalTimeAtom);

  useEffect(() => {
    setTotalTime(time);
  }, [time]);

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

  return (
    <span className={classes.timerWrapper}>
      <Slider
        {...sliderProps}
        min={0}
        max={time}
        value={time - currentTime}
        className={classes.timer}
      />
      <div className={classes.timerText}>{formatTime(time)}</div>
    </span>
  );
};
