import React from "react";
import View from "./View";
import { useAppDispatch, useAppSelector } from "../../CustomHooks/reduxHooks";
import { updateTarget } from "../../Store/Reducers/targets";
import { updateCrosshair } from "../../Store/Reducers/crosshair";
import { fieldTypes } from "./interface";

interface props {
  closeModal: (e: React.MouseEvent<SVGSVGElement | HTMLButtonElement>) => void;
}

const Container = ({ closeModal }: props) => {
  const dispatch = useAppDispatch();

  const { dimensions, color } = useAppSelector((state) => state.target);

  const crosshairValues = useAppSelector((state) => state.crosshair);

  const [fields, setFields] = React.useState<fieldTypes>({
    target_color: {
      type: "color",
      value: color,
    },
    target_dimensions: {
      type: "number",
      value: dimensions,
      min: 50,
      max: 100,
    },
    offset: {
      type: "number",
      value: crosshairValues["offset"],
      min: 0,
      max: 10,
    },
    length: {
      type: "number",
      value: crosshairValues["length"],
      min: 1,
      max: 15,
    },
    color: { type: "color", value: crosshairValues["color"] },
    thickness: {
      type: "number",
      value: crosshairValues["thickness"],
      min: 1,
      max: 10,
    },
  });

  const handleChange = React.useCallback(
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value: string = e.target.value;
      setFields((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            value: prev[key].type === "number" ? parseInt(value) : value,
          },
        };
      });
    },
    []
  );

  const handleConfirm = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const target_details = {
        dimensions: fields.target_dimensions.value,
        color: fields.target_color.value,
      };
      const crosshair_details = {
        offset: fields["offset"].value,
        length: fields["length"].value,
        color: fields["color"].value,
        thickness: fields["thickness"].value,
      };
      localStorage.setItem("crosshair", JSON.stringify(crosshair_details));
      localStorage.setItem("target", JSON.stringify(target_details));
      dispatch(updateCrosshair(crosshair_details));
      dispatch(updateTarget(target_details));
      closeModal(e);
    },
    [fields, dispatch, closeModal]
  );

  const handleCrosshairAttrs = React.useCallback((value: string | number) => {
    if (typeof value === "string") return parseInt(value);
    return value;
  }, []);

  const formatKey = React.useCallback((key: string) => {
    let splits = key.split("_");
    let newKey = "";
    for (const split of splits) {
      if (split !== "target") newKey += split + " ";
    }
    if (newKey) newKey = newKey[0].toUpperCase() + newKey.substring(1);
    return newKey.trim();
  }, []);

  return (
    <View
      formatKey={formatKey}
      handleCrosshairAttrs={handleCrosshairAttrs}
      closeModal={closeModal}
      handleChange={handleChange}
      fields={fields}
      handleConfirm={handleConfirm}
    />
  );
};

export default React.memo(Container);
