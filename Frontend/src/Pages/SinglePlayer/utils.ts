import { updateCrosshair } from "../../Store/Reducers/crosshair";
import { updateTarget } from "../../Store/Reducers/targets";
import { appDispatch } from "../../Store/store";

export const readLocalStorage = () => {
  let target_details_from_storage = localStorage.getItem("target") || "{}";

  let target_details = JSON.parse(target_details_from_storage);

  let new_target_details: { [key: string]: string } = {};
  if (target_details?.color?.length === 7)
    new_target_details["color"] = target_details?.color;
  if (
    typeof target_details?.dimensions === "number" &&
    target_details?.dimensions >= 50 &&
    target_details?.dimensions <= 100
  )
    new_target_details["dimensions"] = target_details?.dimensions;
  appDispatch(updateTarget(new_target_details));

  let crosshair_details_from_storage =
    localStorage.getItem("crosshair") || "{}";
  let crosshair_details = JSON.parse(crosshair_details_from_storage);

  let new_crosshair_details: { [key: string]: string } = {};
  if (crosshair_details?.color?.length === 7)
    new_crosshair_details["color"] = crosshair_details?.color;
  if (
    typeof crosshair_details?.length === "number" &&
    crosshair_details?.length >= 0 &&
    crosshair_details?.length <= 15
  )
    new_crosshair_details["length"] = crosshair_details?.length;
  if (
    typeof crosshair_details?.offset === "number" &&
    crosshair_details?.offset >= 0 &&
    crosshair_details?.offset <= 10
  )
    new_crosshair_details["offset"] = crosshair_details?.offset;
  if (
    typeof crosshair_details?.thickness === "number" &&
    crosshair_details?.thickness >= 0 &&
    crosshair_details?.thickness <= 10
  )
    new_crosshair_details["thickness"] = crosshair_details?.thickness;
  appDispatch(updateCrosshair(new_crosshair_details));
};
