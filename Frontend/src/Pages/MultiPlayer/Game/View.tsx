import { MultiPlayerTimer } from "../../../Components/Navbar/Timer";
import Score from "../../../Components/Navbar/Score";
import Crosshair from "../../../Components/Crosshair/Crosshair";
import PlayField from "../../../Components/PlayField";
import Modal from "../../../Components/Modal";
import styles from "../../../GlobalStyles/gamePageStyles.module.scss";

interface Props {
  isPlaying: boolean;
  isGameover: boolean;
  gameoverModal: JSX.Element;
  scores: {
    yourScore: number;
    opponentScore: number;
  };
}

const View = ({ isPlaying, isGameover, scores, gameoverModal }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Score playerName="You" score={scores["yourScore"]} />
        <MultiPlayerTimer />
        <Score playerName="Opponent" score={scores["opponentScore"]} />
      </div>
      <Modal showModal={isGameover} component={gameoverModal} />
      <PlayField />
      {isPlaying ? <Crosshair /> : null}
    </div>
  );
};

export default View;
