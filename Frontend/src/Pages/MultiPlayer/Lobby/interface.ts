export interface props {
  handleGameStart: (
    e: React.MouseEvent<HTMLButtonElement | SVGSVGElement>
  ) => void;
  isBtnDisabled: boolean;
  roomId: string;
  gameSettings: {
    targetSize: "level1" | "level2" | "level3";
    duration: 60 | 120 | 180;
  };
  handleGoBack: (e: React.MouseEvent) => void;
  handleGameSettings: (
    key: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}
