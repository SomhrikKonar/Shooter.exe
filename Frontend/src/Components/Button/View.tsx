import React from "react";
import styles from "./styles.module.scss";
interface props {
  type?: "button" | "reset" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => void;
  title: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}
export const View = ({ title, style, ...args }: props) => {
  return (
    <div
      className={`${styles.btnContainer} ${
        args.disabled
          ? styles.disabledBtnContainer
          : styles.notDisabledBtnContainer
      }`}
      style={style}
    >
      <button {...args}>{title}</button>
    </div>
  );
};
