import React from "react";
import Target from "../Target";
import styles from "./styles.module.scss";
import { targets } from "../Target/interface";
const View = ({
  handleMissedShots,
  coordinates,
}: {
  handleMissedShots: React.MouseEventHandler<HTMLDivElement>;
  coordinates: targets[];
}) => {
  return (
    <div className={styles.playfield} onClick={handleMissedShots}>
      {coordinates.map((coordinate, index) => (
        <Target {...coordinate} key={index} />
      ))}
    </div>
  );
};

export default View;
