import uuid from "node-uuid";

export const create_random_six_digit_code = (existingLobbyIds) => {
  const id = ("" + Math.random()).substring(2, 8);
  if (existingLobbyIds.has(id)) create_random_six_digit_code(existingLobbyIds);
  return id;
};

export const createRandomId = (length = 0) => {
  let ids = [];
  for (const i of length) {
    ids[i] = uuid.v4();
  }
  return ids;
};

export const getInitialTargets = (socketDatas = []) => {
  let targets = [];
  for (let i = 0; i < 3; i++) {
    const newTargets = generateTargetCoordinate({
      socketDatas,
      existingTargets: targets,
    });
    for (const j in newTargets) {
      if (targets[j]) targets[j].push(newTargets[j]);
      else targets[j] = [newTargets[j]];
    }
  }
  for (const i in socketDatas) {
    for (const target of targets[i]) {
      socketDatas[i]["targets"][target.id] = target;
    }
  }
};

export const generateSingleTarget = (socketDatas = [], removeId = "") => {
  let existingTargets = socketDatas.map((socketData) =>
    Object.values(socketData.targets)
  );
  const newTargets = generateTargetCoordinate({ socketDatas, existingTargets });
  for (let i in socketDatas) {
    let targets = socketDatas[i]["targets"];
    delete targets[removeId];
    targets[newTargets[i].id] = newTargets[i];
  }
};

export const getTargetDimension = (targetSize, clientWidth) => {
  if (clientWidth <= 650) {
    if (targetSize === "level1") {
      return 50;
    }
    if (targetSize === "level2") {
      return 40;
    }
    if (targetSize === "level3") {
      return 30;
    }
  } else {
    if (targetSize === "level1") {
      return 100;
    }
    if (targetSize === "level2") {
      return 80;
    }
    if (targetSize === "level3") {
      return 60;
    }
  }
};

export const generateTargetCoordinate = ({ socketDatas, existingTargets }) => {
  const id = uuid.v4();
  const percentX = Math.trunc(Math.random() * 100);
  const percentY = Math.trunc(Math.random() * 100);
  const targets = [];
  for (const i in socketDatas) {
    const socketData = socketDatas[i];
    const { targetDimension, deviceWidth, deviceHeight } = socketData;
    const targetDetails = isValidCoordinate({
      existingTargets: existingTargets[i],
      dimensions: targetDimension,
      percentX,
      percentY,
      deviceWidth,
      deviceHeight,
      id,
    });
    if (!targetDetails)
      return generateTargetCoordinate({ socketDatas, existingTargets });
    targets.push(targetDetails);
  }
  return targets;
};

export const isValidCoordinate = ({
  existingTargets,
  dimensions,
  percentX,
  percentY,
  deviceWidth,
  deviceHeight,
  id,
}) => {
  const X = Math.floor(((deviceWidth - dimensions) * percentX) / 100);
  const Y = Math.floor(((deviceHeight - dimensions) * percentY) / 100);
  const targetObj = {
    x: X,
    y: Y,
    id,
  };
  if (!existingTargets) return targetObj;
  for (let i = 0; i < existingTargets.length; i++) {
    if (
      ((existingTargets[i].x >= X && existingTargets[i].x <= X + dimensions) ||
        (existingTargets[i].x <= X &&
          existingTargets[i].x + dimensions >= X)) &&
      ((existingTargets[i].y >= Y && existingTargets[i].y <= Y + dimensions) ||
        (existingTargets[i].y <= Y && existingTargets[i].y + dimensions >= Y))
    ) {
      return false;
    }
  }
  return targetObj;
};
