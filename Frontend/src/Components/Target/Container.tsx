import React from "react";
import View from "./View";
import { appDispatch } from "../../Store/store";
import { targets } from "./interface";
import { useAppSelector } from "../../CustomHooks/reduxHooks";
import { removeCoordinate } from "../../Store/Reducers/targets";
import { increseScore } from "../../Store/Reducers/status";
import { useLocation } from "react-router-dom";
import { IO } from "../../Socket";

const Container = ({ x, y, id }: targets) => {
  const { dimensions, color } = useAppSelector((state) => state.target);

  const { pathname } = useLocation();

  const handleClick: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation();
        if (pathname === "/single-player") {
          appDispatch(removeCoordinate(id));
          appDispatch(increseScore());
        } else {
          IO.emit("removeTarget", { id });
        }
      },
      [id, pathname]
    );

  const internalCSS: React.CSSProperties = React.useMemo(() => {
    return {
      height: dimensions,
      width: dimensions,
      left: `${x}px`,
      top: y + "px",
      background: color,
    };
  }, [dimensions, x, y, color]);

  return <View internalCSS={internalCSS} handleClick={handleClick} />;
};

export default React.memo(Container);
