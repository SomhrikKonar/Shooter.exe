import React from "react";
import View from "./View";
import { IO } from "../../../Socket";
import { useAppSelector } from "../../../CustomHooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import GameoverModal from "../../../Modals/MultiPlayerMatchResult";

const Container = () => {
  const { roomId, scores, playerId, status, gameoverReason } = useAppSelector(
    (state) => state.multiplayerGameDetails
  );

  const navigate = useNavigate();

  const scoresToShow = React.useMemo(() => {
    let newScores = {
      yourScore: 0,
      opponentScore: 0,
    };
    if (scores[playerId] >= 0) newScores["yourScore"] = scores[playerId];
    Object.entries(scores).forEach(([k, v]) => {
      if (k !== playerId && newScores["opponentScore"] < v) {
        newScores["opponentScore"] = v;
      }
    });
    return newScores;
  }, [scores, playerId]);

  React.useEffect(() => {
    if (IO.disconnected) {
      navigate("/", { replace: true });
    } else if (!roomId || status === "inLobby") {
      navigate("/multi-player", { replace: true });
    }
  }, []);

  const gameOverModal = React.useMemo(() => {
    let props = { ...scoresToShow, reason: gameoverReason };
    return <GameoverModal {...props} />;
  }, [gameoverReason, scoresToShow]);

  return (
    <View
      isPlaying={status === "inGame"}
      isGameover={status === "gameover"}
      gameoverModal={gameOverModal}
      scores={scoresToShow}
    />
  );
};
export default React.memo(Container);
