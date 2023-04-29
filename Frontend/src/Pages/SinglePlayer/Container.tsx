import React from "react";
import View from "./View";
import { useAppDispatch, useAppSelector } from "../../CustomHooks/reduxHooks";
import { changeStatus } from "../../Store/Reducers/status";
import { readLocalStorage } from "./utils";
const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isPlaying, isGameover } = useAppSelector((state) => state.status);
  const { score } = useAppSelector((state) => state.status);

  React.useEffect(() => {
    readLocalStorage();
  }, []);

  const handlePointerRelocation = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      if (!isPlaying && !isGameover) {
        dispatch(changeStatus({ isPlaying: true }));
      }
    },
    [isPlaying, dispatch, isGameover]
  );

  return (
    <View
      handlePointerRelocation={handlePointerRelocation}
      isPlaying={isPlaying}
      isGameover={isGameover}
      score={score}
    />
  );
};

export default React.memo(Game);
