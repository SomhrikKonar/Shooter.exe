import React from "react";
import styles from "./styles.module.scss";
const View = ({
  score = 0,
  playerName = "",
}: {
  score: number;
  playerName?: string;
}) => {
  return (
    <div className={styles.statsContainer}>
      <p className={styles.score}>
        <span>{playerName || "Score"}</span> {score}
      </p>
    </div>
  );
};

export default React.memo(View);
