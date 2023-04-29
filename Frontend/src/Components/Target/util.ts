import { targets } from "./interface";

export const defaultTargetCoordinates = (dimensions: number) => {
  let targetPoints: targets[] = [];
  for (let i = 0; i < 5; i++) {
    targetPoints.push(generateTargetCoordinate(targetPoints, dimensions));
  }
  return targetPoints;
};

export const generateTargetCoordinate = (
  existingTargets: targets[],
  dimensions: number
): targets => {
  let {
    minX,
    minY,
    maxX,
    maxY,
  }: { minX: number; maxX: number; minY: number; maxY: number } = {
    minX: 0,
    maxX: window.innerWidth,
    minY: 70,
    maxY: window.innerHeight - 70,
  };
  let randomX: number = Math.random() * (maxX - dimensions - minX) + minX;
  let randomY: number = Math.random() * (maxY - dimensions - minY) + minY;
  for (let i = 0; i < existingTargets.length; i++) {
    if (
      ((existingTargets[i].x >= randomX &&
        existingTargets[i].x <= randomX + dimensions) ||
        (existingTargets[i].x <= randomX &&
          existingTargets[i].x + dimensions >= randomX)) &&
      ((existingTargets[i].y >= randomY &&
        existingTargets[i].y <= randomY + dimensions) ||
        (existingTargets[i].y <= randomY &&
          existingTargets[i].y + dimensions >= randomY))
    ) {
      return generateTargetCoordinate(existingTargets, dimensions);
    }
  }
  let newId = existingTargets[existingTargets.length - 1]
    ? parseInt(existingTargets[existingTargets.length - 1]?.id) + 1
    : 0;

  return {
    x: randomX,
    y: randomY,
    id: newId.toString(),
  };
};
