// MODES
export const MODE = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

// LEVEL CONFIG
export const LEVEL_CONFIG = {
  easy: {
    1: {
      level: 1,
      maxReleasedKeys: 1,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 5,
      jellyDistance: 7000,
      jellySpeedMin: 2,
      jellySpeedMax: 3,
    },
    2: {
      level: 2,
      maxReleasedKeys: 2,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 4,
      jellyDistance: 2000,
      jellySpeedMin: 2,
      jellySpeedMax: 3,
    },
    3: {
      level: 3,
      maxReleasedKeys: 3,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 3,
      jellyDistance: 2000,
      jellySpeedMin: 2,
      jellySpeedMax: 3,
    },
    4: {
      level: 4,
      maxReleasedKeys: 4,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 3,
      jellyDistance: 2000,
      jellySpeedMin: 2,
      jellySpeedMax: 4,
    },
  },
  medium: {
    1: {
      level: 1,
      maxReleasedKeys: 1,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 6,
      jellyDistance: 2100,
      jellySpeedMin: 2,
      jellySpeedMax: 3,
    },
    2: {
      level: 2,
      maxReleasedKeys: 2,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 6,
      jellyDistance: 1500,
      jellySpeedMin: 2,
      jellySpeedMax: 4,
    },
    3: {
      level: 3,
      maxReleasedKeys: 3,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 6,
      jellyDistance: 900,
      jellySpeedMin: 2,
      jellySpeedMax: 5,
    },
    4: {
      level: 4,
      maxReleasedKeys: 4,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 6,
      jellyDistance: 700,
      jellySpeedMin: 3,
      jellySpeedMax: 6,
    },
  },
  hard: {
    1: {
      level: 1,
      maxReleasedKeys: 1,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 8,
      jellyDistance: 800,
      jellySpeedMin: 4,
      jellySpeedMax: 5,
    },
    2: {
      level: 2,
      maxReleasedKeys: 2,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 8,
      jellyDistance: 800,
      jellySpeedMin: 5,
      jellySpeedMax: 7,
    },
    3: {
      level: 3,
      maxReleasedKeys: 3,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 8,
      jellyDistance: 700,
      jellySpeedMin: 5,
      jellySpeedMax: 8,
    },
    4: {
      level: 4,
      maxReleasedKeys: 4,
      coinDistance: 400,

      // alter difficulty:
      coinsBeforeKey: 8,
      jellyDistance: 600,
      jellySpeedMin: 5,
      jellySpeedMax: 9,
    },
  },
};
