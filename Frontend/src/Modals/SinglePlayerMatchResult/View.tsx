import React from "react";
import styles from "./styles.module.scss";
import avatar from "../../Assests/images/avatar.jpg";
import { useAppDispatch, useAppSelector } from "../../CustomHooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { resetStatuses } from "../../Store/Reducers/status";
const View = () => {
  const { score, missedShots } = useAppSelector((state) => state.status);
  const dispatch = useAppDispatch();

  const accuracy: number = React.useMemo(() => {
    const percent: number = score / (score + missedShots);
    if (Number.isNaN(percent)) return 0;
    return Math.trunc(percent * 100);
  }, [score, missedShots]);

  const navigate = useNavigate();

  const handleBtnClick = React.useCallback(
    (goHome: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(resetStatuses());
      if (goHome) navigate("/");
    },
    [dispatch, navigate]
  );

  return (
    <div className={styles.modal}>
      <img src={avatar} alt="Avatar" className={styles.avatar} />
      <p className={styles.message}>
        You successfully hit {score} targets with an accuracy of {accuracy}%.
      </p>
      <div className={styles.buttonsContainer}>
        <button className={styles.btn} onClick={handleBtnClick(true)}>
          Go Home
        </button>
        <button className={styles.btn} onClick={handleBtnClick(false)}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default React.memo(View);
