import React from "react";
import styles from "./styles.module.scss";
import CrosshairLogo from "../../Components/CrosshairLogo";
import { ReactComponent as Cross } from "../../Assests/svgs/Cross.svg";
import { fieldTypes } from "./interface";
interface props {
  closeModal: (e: React.MouseEvent<SVGSVGElement | HTMLButtonElement>) => void;
  handleChange: (
    key: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  fields: fieldTypes;
  handleConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCrosshairAttrs: (key: string | number) => number;
  formatKey: (key: string) => string;
}
const View = ({
  formatKey,
  handleCrosshairAttrs,
  closeModal,
  handleChange,
  fields,
  handleConfirm,
}: props) => {
  return (
    <div className={styles.settings}>
      <header className={styles.header}>Settings</header>
      <Cross
        cursor={"pointer"}
        fill="#fff"
        className={styles.cross}
        onClick={closeModal}
      />
      <div className={styles.scrollableContainer}>
        <section>
          <h4>Target</h4>
          <div
            className={styles.target}
            style={{
              height: fields?.target_dimensions?.value + "px",
              width: fields?.target_dimensions?.value + "px",
              background: fields?.target_color?.value,
            }}
          ></div>
          {Object.entries(fields).map(
            ([k, v]) =>
              (k === "target_color" || k === "target_dimensions") && (
                <div className={styles.field} key={k}>
                  <p className={styles.key}>{formatKey(k)}</p>
                  <input
                    className={styles.inputField}
                    {...v}
                    onChange={handleChange(k)}
                  />
                </div>
              )
          )}
        </section>
        <section className={styles.crosshairSection}>
          <h4>Crosshair</h4>
          <CrosshairLogo
            showCrosshair={true}
            length={handleCrosshairAttrs(fields.length.value)}
            offset={handleCrosshairAttrs(fields.offset.value)}
            thickness={handleCrosshairAttrs(fields.thickness.value)}
            color={fields.color.value.toString()}
            position={"relative"}
            style={{ marginBlock: "10px" }}
          />
          {Object.entries(fields).map(([k, v]) => {
            return (
              k !== "target_color" &&
              k !== "target_dimensions" && (
                <div className={styles.field} key={k}>
                  <p className={styles.key}>{formatKey(k)}</p>
                  <input
                    className={styles.inputField}
                    {...v}
                    onChange={handleChange(k)}
                  />
                </div>
              )
            );
          })}
        </section>
      </div>
      <button className={styles.confirmBtn} onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default View;
