import React from "react";
import styles from "./styles.module.scss";
import Button from "../../../Components/Button";
import { ReactComponent as GoBack } from "../../../Assests/svgs/RightArrow.svg";
const View = ({
  handleJoinLobby,
  handleCreateLobby,
  handleRoomId,
  handleGoBack,
}: {
  handleGoBack: (e: React.MouseEvent) => void;
  handleCreateLobby: (e: React.MouseEvent) => void;
  handleJoinLobby: (e: React.FormEvent) => void;
  handleRoomId: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={handleGoBack}>
        <GoBack className={styles.icon} />
        <span>Go Back</span>
      </div>
      <header className={styles.header}>Multiplayer</header>
      <Button onClick={handleCreateLobby} title="Create Lobby" />
      <p>OR</p>
      <form onSubmit={handleJoinLobby}>
        <div className={styles.input}>
          <input
            required={true}
            type="text"
            onChange={handleRoomId}
            placeholder="Enter Room Id"
          />
        </div>
        <Button
          type="submit"
          style={{ marginInline: "auto" }}
          title="Join Lobby"
        ></Button>
      </form>
    </div>
  );
};

export default View;
