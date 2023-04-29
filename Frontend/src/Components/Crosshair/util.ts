export const mouseHandler = ({
  e,
  crosshairSize,
  sensitivity,
  ref,
}: {
  e: any;
  crosshairSize: number;
  sensitivity: number;
  ref: { current: HTMLDivElement | null };
}) => {
  let x = (e.clientX - crosshairSize / 2) * sensitivity;
  let y = (e.clientY - crosshairSize / 2) * sensitivity;
  if (ref.current) {
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  }
};
