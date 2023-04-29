import React from "react";
import View from "./View";
import { useAppSelector } from "../../../CustomHooks/reduxHooks";
const Container = () => {
  const { timeRemaining } = useAppSelector(
    (state) => state.multiplayerGameDetails
  );

  const handleTimeFormat = React.useCallback((time: number) => {
    if (time < 9) return "0" + time;
    else return time.toString();
  }, []);

  const timer = React.useMemo(() => {
    if (!timeRemaining) return { min: "00", sec: "00" };
    const min = handleTimeFormat(Math.floor(timeRemaining / 60));
    const sec = handleTimeFormat(Math.floor(timeRemaining % 60));
    return { min, sec };
  }, [timeRemaining, handleTimeFormat]);

  return <View timer={timer} />;
};

export default React.memo(Container);
