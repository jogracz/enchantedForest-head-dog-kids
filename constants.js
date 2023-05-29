export const KEYS = {
  arrowUp: "ArrowUp",
  arrowRight: "ArrowRight",
  arrowLeft: "ArrowLeft",
  space: " ",
  d: "d",
};

export const GAME_SPEED = {
  normal: 4,
  fast: 6,
};
export const PLAYER_MOVE_STATE = {
  idleRight: "idleRight",
  idleLeft: "idleLeft",
  runRight: "runRight",
  runLeft: "runLeft",
  jumpRight: "jumpRight",
  jumpLeft: "jumpLeft",
  idle: "idle",
  run: "run",
  jump: "jump",
};

export const PLAYER_DIRECTION = {
  left: "left",
  right: "right",
};

// export const GROUND_POSITION_Y = 445;
export const GROUND_POSITION_Y = 870;

export const DEFAULT_VALUES = {
  player: {
    width: 110,
    height: 155,
    imageWidth: 180,
    imageHeight: 190,
    speedX: 7,
    frameX: 0,
    maxFrameX: 14,
  },
};

export const INSTRUCTIONS = {
  collectCoins: "Collect coins!",
  findKeys: {
    1: "Find 1 key",
    2: "Find 2 keys",
    3: "Find 3 keys",
    4: "Find 4 keys",
  },
  openChest: "Open the treasure chest!",
};

export const SIGN_TYPES = {
  right: "right",
  left: "left",
};
export const JELLY_TYPES = {
  vertical: "vertical",
  horizontal: "horizontal",
};

export const MODES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};
