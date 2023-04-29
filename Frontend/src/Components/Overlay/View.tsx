import React from "react";
import styles from "./styles.module.scss";
interface props {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  message?: string;
  showCursor: boolean;
}
const View = ({ message, showCursor, ...props }: props) => {
  return (
    <div
      className={styles.overlay}
      {...props}
      style={{ cursor: showCursor ? "auto" : "none" }}
    >
      {message}
    </div>
  );
};

export default View;
