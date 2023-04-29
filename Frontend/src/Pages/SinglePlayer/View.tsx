import React from "react";
import styles from "../../GlobalStyles/gamePageStyles.module.scss";
import Crosshair from "../../Components/Crosshair/Crosshair";
import PlayField from "../../Components/PlayField";
import Overlay from "../../Components/Overlay";
import Modal from "../../Components/Modal";
import GameoverModal from "../../Modals/SinglePlayerMatchResult";
import { SinglePlayerTimer } from "../../Components/Navbar/Timer";
import Score from "../../Components/Navbar/Score";
import Settings from "../../Components/Navbar/Settings";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
interface Props {
  handlePointerRelocation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isPlaying: boolean;
  isGameover: boolean;
  score: number;
}

const View = ({
  handlePointerRelocation,
  score,
  isPlaying,
  isGameover,
}: Props) => {
  const { height } = useAppSelector((state) => state.browser);

  return (
    <div className={styles.container} style={{ height }}>
      <div className={styles.navbarContainer}>
        <Score score={score} />
        <SinglePlayerTimer />
        <Settings />
      </div>
      {!isPlaying && !isGameover ? (
        <Overlay
          showCursor={true}
          onClick={handlePointerRelocation}
          message="Click to begin !"
        />
      ) : null}
      <Modal showModal={isGameover} component={<GameoverModal />} />
      <PlayField />
      {isPlaying ? <Crosshair /> : null}
    </div>
  );
};

export default View;
