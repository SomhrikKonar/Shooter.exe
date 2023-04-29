import React from "react";
import styles from "./styles.module.scss";
import { modalProps } from "./interface";
import Overlay from "../Overlay";
import { useAppDispatch } from "../../CustomHooks/reduxHooks";
import { updateCrosshair } from "../../Store/Reducers/crosshair";
const View = ({
  showModal,
  component,
  showCursorInOverlay = true,
}: modalProps) => {
  const dispatch = useAppDispatch();
  const handleCrosshairStatus = React.useCallback(
    (status: boolean) => () => {
      dispatch(updateCrosshair({ showCrosshair: status }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (!showModal) dispatch(updateCrosshair({ showCrosshair: true }));
  }, [dispatch, showModal]);

  return showModal ? (
    <>
      <Overlay showCursor={showCursorInOverlay} />
      <div
        onMouseEnter={handleCrosshairStatus(false)}
        onMouseLeave={handleCrosshairStatus(true)}
        className={styles.modalContainer}
      >
        {component}
      </div>
    </>
  ) : (
    <></>
  );
};

export default View;
