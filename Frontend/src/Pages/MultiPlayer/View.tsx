import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IO, addSocketListners } from "../../Socket";
import { readLocalStorage } from "../SinglePlayer/utils";
import { appDispatch } from "../../Store/store";
import { resetMultiplayerGameDetails } from "../../Store/Reducers/multiplayerGameDetails";
import { resetStatuses } from "../../Store/Reducers/status";
import { resetCoordinates } from "../../Store/Reducers/targets";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
const View = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { height } = useAppSelector((state) => state.browser);

  React.useEffect(() => {
    if (!IO.connected) {
      IO.connect();
      addSocketListners(navigate);
    }
    return () => {
      IO.disconnect();
      IO.removeAllListeners();
      appDispatch(resetMultiplayerGameDetails());
      appDispatch(resetStatuses());
      appDispatch(resetCoordinates());
    };
  }, []);

  React.useEffect(() => {
    readLocalStorage();
  }, []);

  return (
    <div
      style={{
        height,
        cursor: pathname === "/multi-player/game" ? "none" : "auto",
      }}
    >
      <Outlet />
    </div>
  );
};

export default View;
