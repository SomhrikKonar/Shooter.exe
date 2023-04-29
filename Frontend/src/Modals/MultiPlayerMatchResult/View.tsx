import React from "react";
import styles from "./styles.module.scss";
import avatar from "../../Assests/images/avatar.jpg";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { IO } from "../../Socket";
import { appDispatch } from "../../Store/store";
import { resetMultiplayerGameDetails } from "../../Store/Reducers/multiplayerGameDetails";

const View = ({
  yourScore,
  opponentScore,
  reason,
}: {
  yourScore: number;
  opponentScore: number;
  reason: "timerOut" | "playerQuit" | "";
}) => {
  const { missedShots } = useAppSelector((state) => state.status);

  const accuracy: number = React.useMemo(() => {
    const percent: number = yourScore / (yourScore + missedShots);
    if (Number.isNaN(percent)) return 0;
    return Math.trunc(percent * 100);
  }, [yourScore, missedShots]);

  const navigate = useNavigate();

  const handleBtnClick = React.useCallback(
    (goHome: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      IO.emit("leaveLobby", false);
      appDispatch(resetMultiplayerGameDetails());
      if (goHome) navigate("/");
      else navigate("/multi-player");
    },
    [navigate]
  );

  const winner = React.useMemo(() => {
    if (yourScore > opponentScore)
      return { status: "Win", message: `You had an accuracy of ${accuracy}%.` };
    else if (opponentScore > yourScore)
      return {
        status: "Lost",
        message: `Your opponent got ${
          opponentScore - yourScore
        } more shots than you.`,
      };
    return { status: "Draw", message: `You had an accuracy of ${accuracy}%` };
  }, [yourScore, opponentScore, accuracy]);

  return (
    <div className={styles.modal}>
      <img src={avatar} alt="Avatar" className={styles.avatar} />
      <div className={styles.messageContainer}>
        {reason === "timerOut" ? (
          <>
            <p className={styles.status}>{winner.status}</p>
            <p className={styles.message}>{winner.message}</p>
          </>
        ) : reason === "playerQuit" ? (
          <>
            <p className={styles.status}>Won</p>
            <p className={styles.message}>Your opponent forfeited the match.</p>
          </>
        ) : (
          <p className={styles.message}>Something Went Wrong !</p>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.btn} onClick={handleBtnClick(true)}>
          Main Menu
        </button>
        <button className={styles.btn} onClick={handleBtnClick(false)}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default React.memo(View);
