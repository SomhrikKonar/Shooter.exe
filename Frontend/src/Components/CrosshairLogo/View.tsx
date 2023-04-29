import React from "react";
import styles from "./styles.module.scss";
interface props {
  crosshairRef?: React.LegacyRef<HTMLDivElement> | undefined;
  length: number;
  offset: number;
  thickness: number;
  color: string;
  showCrosshair: boolean;
  position?: "relative" | "fixed";
  style?: React.CSSProperties;
}
const View = ({
  crosshairRef = undefined,
  length,
  offset,
  thickness,
  color,
  showCrosshair,
  style,
  position = "fixed",
}: props) => {
  return (
    <div
      ref={crosshairRef}
      id="crosshair"
      className={styles.crosshair}
      style={{
        position,
        height: length * 2 + offset,
        width: length * 2 + offset,
        visibility: showCrosshair ? "visible" : "hidden",
        ...style,
      }}
    >
      <div className={styles.horizontal}>
        <div
          className={styles.line}
          style={{
            background: color,
            height: thickness + "px",
            marginRight: offset,
            width: length + "px",
          }}
        ></div>
        <div
          className={styles.line}
          style={{
            background: color,
            height: thickness + "px",
            width: length + "px",
          }}
        ></div>
      </div>
      <div className={styles.vertical}>
        <div
          className={styles.line}
          style={{
            background: color,
            width: thickness + "px",
            marginBottom: offset,
            height: length + "px",
          }}
        ></div>
        <div
          className={styles.line}
          style={{
            background: color,
            width: thickness + "px",
            height: length + "px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default View;
