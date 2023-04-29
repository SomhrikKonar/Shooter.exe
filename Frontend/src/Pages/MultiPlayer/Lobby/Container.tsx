import React from "react";
import View from "./View";
import { useAppSelector } from "../../../CustomHooks/reduxHooks";
import { IO } from "../../../Socket";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const { scores, roomId, status } = useAppSelector(
    (state) => state.multiplayerGameDetails
  );

  const [gameSettings, setGameSettings] = React.useState<{
    targetSize: "level1" | "level2" | "level3";
    duration: 60 | 120 | 180;
  }>({
    targetSize: "level1",
    duration: 60,
  });

  const handleChangeGameSettings = React.useCallback(
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      setGameSettings((prev) => ({
        ...prev,
        [key]: key === "duration" ? parseInt(value) : value,
      }));
    },
    []
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!roomId || status !== "inLobby") {
      navigate("/multi-player", { replace: true });
    }
  }, []);

  const handleGameStart = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      IO.emit("startGame", gameSettings);
    },
    [gameSettings]
  );

  const isBtnDisabled = React.useMemo(() => {
    if (Object.keys(scores).length >= 2) {
      return false;
    }
    return true;
  }, [scores]);

  const handleGoBack = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate("/multi-player");
    },
    [navigate]
  );

  return (
    <View
      handleGoBack={handleGoBack}
      roomId={roomId}
      handleGameStart={handleGameStart}
      gameSettings={gameSettings}
      handleGameSettings={handleChangeGameSettings}
      isBtnDisabled={isBtnDisabled}
    />
  );
};
export default React.memo(Container);
