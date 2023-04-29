import React from "react";

import styles from "./styles.module.scss";
const View = ({
  internalCSS,
  handleClick,
}: {
  internalCSS: React.CSSProperties;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={styles.targetContainer}
      style={internalCSS}
      onClick={handleClick}
    ></div>
  );
};

export default View;
