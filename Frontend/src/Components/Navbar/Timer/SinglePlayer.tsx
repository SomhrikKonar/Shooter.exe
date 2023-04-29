import React from "react";
import View from "./View";
import { useAppSelector } from "../../../CustomHooks/reduxHooks";
import { appDispatch } from "../../../Store/store";
import { changeStatus } from "../../../Store/Reducers/status";

const Container = () => {
  const [timer, setTimer] = React.useState<{ min: string; sec: string }>({
    min: "01",
    sec: "00",
  });

  const { isPlaying, isGameover, isPaused } = useAppSelector(
    (state) => state.status
  );

  const handleTimeFormat = React.useCallback((time: number) => {
    if (time < 9) return "0" + time;
    else return time.toString();
  }, []);

  React.useEffect(() => {
    if (!isPlaying || isPaused) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { min, sec } = prev;
        let [newMin, newSec] = [parseInt(min), parseInt(sec)];
        if (newSec - 1 >= 0) {
          sec = handleTimeFormat(newSec - 1);
        } else if (newMin - 1 >= 0) {
          min = handleTimeFormat(newMin - 1);
          sec = "59";
        } else {
          [min, sec] = ["00", "00"];
        }
        return { min, sec };
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, handleTimeFormat, isPaused]);

  React.useEffect(() => {
    if (timer.sec === "00" && timer.min === "00") {
      appDispatch(changeStatus({ isPlaying: false, isGameover: true }));
    }
  }, [timer]);

  React.useEffect(() => {
    if (!isPlaying && !isGameover) setTimer({ min: "01", sec: "00" });
  }, [isPlaying, isGameover]);

  return <View timer={timer} />;
};

export default React.memo(Container);
