import React from "react";
import View from "./View";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
import { targets } from "../Target/interface";
import { defaultTargetCoordinates } from "../Target/util";
import { addCoordinates, resetCoordinates } from "../../Store/Reducers/targets";
import { appDispatch } from "../../Store/store";
import {
  increaseMissedShots,
  resetStatuses,
} from "../../Store/Reducers/status";
import { useLocation } from "react-router-dom";

const Container = () => {
  const { coordinates, dimensions } = useAppSelector((state) => state.target);

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname !== "/single-player") return;
    const initialTargets: targets[] = defaultTargetCoordinates(dimensions);
    appDispatch(addCoordinates(initialTargets));
    return () => {
      appDispatch(resetCoordinates());
      appDispatch(resetStatuses());
    };
  }, [dimensions, pathname]);

  const handleMissedShots: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((e) => {
      e.stopPropagation();
      appDispatch(increaseMissedShots());
    }, []);

  return (
    <View handleMissedShots={handleMissedShots} coordinates={coordinates} />
  );
};

export default React.memo(Container);
