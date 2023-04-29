import { ReactComponent as GoBack } from "../../../Assests/svgs/RightArrow.svg";
import styles from "./styles.module.scss";
import Button from "../../../Components/Button";
import { props } from "./interface";
import { dificultyOptions, durationOptions } from "./utils";
const View = ({
  roomId,
  gameSettings,
  handleGameStart,
  isBtnDisabled,
  handleGameSettings,
  handleGoBack,
}: props) => {
  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={handleGoBack}>
        <GoBack className={styles.icon} />
        <span>Go Back</span>
      </div>
      <header className={styles.header}>Lobby</header>
      <section className={styles.roomId}>
        <p className={styles.text}>ROOM ID</p>
        <p className={styles.colon}>:</p>
        <p className={styles.id}>{roomId}</p>
      </section>
      <section className={styles.gameSettings}>
        <p> Game Settings </p>
        <div className={styles.settingsContainer}>
          <div className={styles.field}>
            <p>Difficulty :</p>
            <div className={styles.optionsContainer}>
              {dificultyOptions.map(({ key, value }) => (
                <div className={styles.option} key={key}>
                  <input
                    id={key}
                    type="radio"
                    value={value}
                    checked={gameSettings["targetSize"] === value}
                    onChange={handleGameSettings("targetSize")}
                  />
                  <label htmlFor={key}>{key}</label>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <p>Duration :</p>
            <div className={styles.optionsContainer}>
              {durationOptions.map(({ key, value }) => (
                <div className={styles.option} key={key}>
                  <input
                    type="radio"
                    value={value}
                    checked={gameSettings["duration"] === value}
                    onChange={handleGameSettings("duration")}
                  />
                  <label htmlFor={key}>{key}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Button
        title="Start Game"
        disabled={isBtnDisabled}
        onClick={handleGameStart}
      />
      {isBtnDisabled && (
        <p className={styles.warning}>
          ( <b>Warning:</b>&nbsp; Share the room id with your friend, minimum 2
          players are required to enter the game. )
        </p>
      )}
    </div>
  );
};

export default View;
