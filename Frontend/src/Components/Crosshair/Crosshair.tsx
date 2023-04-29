import React from "react";
import { mouseHandler } from "./util";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
import CrosshairLogo from "../CrosshairLogo";
function Crosshair() {
  const crosshairRef = React.useRef<HTMLDivElement | null>(null);

  const { showCrosshair, ...crosshairAttrs } = useAppSelector(
    (state) => state.crosshair
  );

  React.useEffect(() => {
    const callMouseHandler = (e: any) => {
      mouseHandler({
        e,
        crosshairSize:
          crosshairAttrs.length * 2 +
          crosshairAttrs.offset +
          crosshairAttrs.thickness,
        sensitivity: 1,
        ref: crosshairRef,
      });
    };
    window.addEventListener("mousemove", callMouseHandler);
    return () => {
      window.removeEventListener("mousemove", callMouseHandler);
    };
  }, [crosshairAttrs]);

  return (
    <CrosshairLogo
      {...crosshairAttrs}
      crosshairRef={crosshairRef}
      showCrosshair={showCrosshair}
    />
  );
}

export default Crosshair;
