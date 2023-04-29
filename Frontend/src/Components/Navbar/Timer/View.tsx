import styles from "./styles.module.scss";
const View = ({ timer }: { timer: { min: string; sec: string } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>{timer.min}</div>
      <div className={styles.time}>{timer.sec}</div>
    </div>
  );
};

export default View;
