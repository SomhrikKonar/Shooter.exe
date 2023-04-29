import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal";
import Button from "../../Components/Button";
import SettingsModal from "../../Modals/Settings";
import { readLocalStorage } from "../SinglePlayer/utils";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
const View = () => {
  const [showSettings, setShowSettings] = React.useState(false);
  const navigate = useNavigate();
  const { height } = useAppSelector((state) => state.browser);

  React.useEffect(() => {
    readLocalStorage();
  }, []);

  const handleShowSettings = React.useCallback(
    (status: boolean) =>
      (e: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => {
        e.stopPropagation();
        setShowSettings(status);
      },
    []
  );
  const handlePageChange = React.useCallback(
    (path: string) =>
      (e: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => {
        e.stopPropagation();
        navigate(path);
      },
    [navigate]
  );
  return (
    <div className={styles.container} style={{ height }}>
      <header className={styles.header}>Shooter.exe</header>
      <Button
        title="Single Player"
        onClick={handlePageChange("/single-player")}
      />
      <Button title="Multiplayer" onClick={handlePageChange("/multi-player")} />
      <Button title="Settings" onClick={handleShowSettings(true)} />
      <Modal
        showModal={showSettings}
        component={<SettingsModal closeModal={handleShowSettings(false)} />}
      />
    </div>
  );
};

export default View;
