import React from "react";
import styles from "./styles.module.scss";
import Modal from "../../Modal";
import SettingsModal from "../../../Modals/Settings";
import { ReactComponent as Settings } from "../../../Assests/svgs/Settings.svg";
import { useAppDispatch } from "../../../CustomHooks/reduxHooks";
import { updateCrosshair } from "../../../Store/Reducers/crosshair";
import { changeStatus } from "../../../Store/Reducers/status";
const View = () => {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleModal = React.useCallback(
    (status: boolean) => () => {
      dispatch(changeStatus({ isPaused: status }));
      setShowModal(status);
    },
    [dispatch]
  );

  const handleCrosshairStatus = React.useCallback(
    (status: boolean) => () => {
      dispatch(updateCrosshair({ showCrosshair: status }));
    },
    [dispatch]
  );

  return (
    <>
      <Modal
        showCursorInOverlay={false}
        showModal={showModal}
        component={<SettingsModal closeModal={handleModal(false)} />}
      />
      <Settings
        height={30}
        onMouseEnter={handleCrosshairStatus(false)}
        onMouseLeave={handleCrosshairStatus(true)}
        width={30}
        id={"settingIcon"}
        className={styles.icon}
        onClick={handleModal(true)}
      />
    </>
  );
};

export default React.memo(View);
