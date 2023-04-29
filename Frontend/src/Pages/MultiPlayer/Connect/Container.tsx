import React from "react";
import View from "./View";
import { IO } from "../../../Socket";
import { useAppSelector } from "../../../CustomHooks/reduxHooks";
import { appDispatch } from "../../../Store/store";
import { resetMultiplayerGameDetails } from "../../../Store/Reducers/multiplayerGameDetails";
import { resetStatuses } from "../../../Store/Reducers/status";
import { resetCoordinates } from "../../../Store/Reducers/targets";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const [id, setId] = React.useState("");
  const { roomId, status } = useAppSelector(
    (state) => state.multiplayerGameDetails
  );
  const navigate = useNavigate();

  const handleJoinLobby = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      IO.emit("joinLobby", {
        roomId: id,
        deviceWidth: window.innerWidth,
        deviceHeight: window.innerHeight - 70,
      });
    },
    [id]
  );

  const handleCreateLobby = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    IO.emit("createLobby", {
      deviceWidth: window.innerWidth,
      deviceHeight: window.innerHeight - 70,
    });
  }, []);

  const handleRoomId = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
    },
    []
  );

  React.useEffect(() => {
    if (roomId || status !== "inLobby") {
      IO.emit("leaveLobby");
      appDispatch(resetMultiplayerGameDetails());
      appDispatch(resetStatuses());
      appDispatch(resetCoordinates());
    }
  }, []);

  const handleGoBack = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate("/");
    },
    [navigate]
  );

  return (
    <View
      handleCreateLobby={handleCreateLobby}
      handleJoinLobby={handleJoinLobby}
      handleRoomId={handleRoomId}
      handleGoBack={handleGoBack}
    />
  );
};
export default React.memo(Container);
