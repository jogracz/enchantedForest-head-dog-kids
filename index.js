import Player from "./player.js";
import {
  KEYS,
  GROUND_POSITION_Y,
  PLAYER_MOVE_STATE,
  GAME_SPEED,
  INSTRUCTIONS,
  SIGN_TYPES,
  JELLY_TYPES,
  MODES,
} from "./constants.js";
import { LEVEL_CONFIG } from "./levelConfig.js";
import { IMAGES } from "./images.js";

window.addEventListener("load", function () {
  // helpers
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const rand = (min, max) => Math.random() * (max - min) + min;

  let isGameStarted = false;
  let isGameFinished = false;
  let isGameEndShown = false;
  let gameMode = MODES.EASY;

  const nextButton = document.getElementById("nextButton");
  const welcomeMessage1 = document.getElementById("welcomeMessage1");
  const welcomeMessage2 = document.getElementById("welcomeMessage2");
  const welcomeMessage3 = document.getElementById("welcomeMessage3");
  const welcomeMessage4 = document.getElementById("welcomeMessage4");
  const welcomeHeader = document.getElementById("welcomeHeader");
  const endMessage1 = document.getElementById("endMessage1");
  const secretMesage = document.getElementById("secretMesage");
  const endHeader1 = document.getElementById("endHeader1");
  const endHeader2 = document.getElementById("endHeader2");
  const secretMessagePart1 = IMAGES.secretMessage["1"];
  const secretMessagePart2 = IMAGES.secretMessage["2"];
  const secretMessagePart3 = IMAGES.secretMessage["3"];
  const secretMessagePart4 = IMAGES.secretMessage["4"];
  const startButton = document.getElementById("startButton");
  const playText = document.getElementById("playText");
  const easyModeContainer = document.getElementById("easyModeContainer");
  const mediumModeContainer = document.getElementById("mediumModeContainer");
  const hardModeContainer = document.getElementById("hardModeContainer");
  const modeEasyCheckFalse = document.getElementById("modeEasyCheckFalse");
  const modeEasyCheckTrue = document.getElementById("modeEasyCheckTrue");
  const modeMediumCheckFalse = document.getElementById("modeMediumCheckFalse");
  const modeMediumCheckTrue = document.getElementById("modeMediumCheckTrue");
  const modeHardCheckFalse = document.getElementById("modeHardCheckFalse");
  const modeHardCheckTrue = document.getElementById("modeHardCheckTrue");

  const handleCheckButtons = (mode) => {
    switch (mode) {
      case MODES.EASY:
        modeEasyCheckFalse.classList.add("hide");
        modeEasyCheckTrue.classList.remove("hide");
        modeMediumCheckFalse.classList.remove("hide");
        modeMediumCheckTrue.classList.add("hide");
        modeHardCheckFalse.classList.remove("hide");
        modeHardCheckTrue.classList.add("hide");
        break;
      case MODES.MEDIUM:
        modeEasyCheckFalse.classList.remove("hide");
        modeEasyCheckTrue.classList.add("hide");
        modeMediumCheckFalse.classList.add("hide");
        modeMediumCheckTrue.classList.remove("hide");
        modeHardCheckFalse.classList.remove("hide");
        modeHardCheckTrue.classList.add("hide");
        break;
      case MODES.HARD:
        modeEasyCheckFalse.classList.remove("hide");
        modeEasyCheckTrue.classList.add("hide");
        modeMediumCheckFalse.classList.remove("hide");
        modeMediumCheckTrue.classList.add("hide");
        modeHardCheckFalse.classList.add("hide");
        modeHardCheckTrue.classList.remove("hide");
        break;
      default:
        break;
    }
  };
  easyModeContainer.addEventListener("click", () => {
    gameMode = MODES.EASY;
    handleCheckButtons(gameMode);
  });
  mediumModeContainer.addEventListener("click", () => {
    gameMode = MODES.MEDIUM;
    handleCheckButtons(gameMode);
  });
  hardModeContainer.addEventListener("click", () => {
    gameMode = MODES.HARD;
    handleCheckButtons(gameMode);
  });

  const goToMessage2 = () => {
    nextButton.removeEventListener("click", goToMessage2);
    nextButton.addEventListener("click", goToMessage3);
    welcomeMessage1.classList.add("hide");
    welcomeMessage2.classList.remove("hide");
  };

  const goToMessage3 = () => {
    nextButton.removeEventListener("click", goToMessage3);
    nextButton.addEventListener("click", goToMessage4);
    // nextButton.classList.add("hide");
    welcomeMessage2.classList.add("hide");
    welcomeMessage3.classList.remove("hide");
    // startButton.classList.remove("hide");
    // playText.classList.remove("hide");
  };

  const goToMessage4 = () => {
    nextButton.removeEventListener("click", goToMessage4);
    startButton.addEventListener("click", startGame);
    nextButton.classList.add("hide");
    // welcomeMessage2.classList.add("hide");
    welcomeMessage3.classList.add("hide");
    welcomeMessage4.classList.remove("hide");
    startButton.classList.remove("hide");
    playText.classList.remove("hide");
  };

  const revealSecretMessage = () => {
    nextButton.removeEventListener("click", revealSecretMessage);
    // startButton.addEventListener("click", playAgain);
    endHeader1.classList.add("hide");
    endMessage1.classList.add("hide");
    secretMessagePart1.classList.add("hide");
    secretMessagePart2.classList.add("hide");
    secretMessagePart3.classList.add("hide");
    secretMessagePart4.classList.add("hide");
    nextButton.classList.add("hide");
    playText.classList.add("hide");

    endHeader2.classList.remove("hide");
    secretMesage.classList.remove("hide");

    // playAgainText.classList.remove("hide");
    // startButton.classList.remove("hide");
  };

  // start game func
  const startGame = () => {
    isGameStarted = true;
    nextButton.removeEventListener("click", startGame);
    welcomeScreen.classList.add("hide");
    nextButton.classList.add("hide");
    welcomeMessage4.classList.add("hide");
    welcomeHeader.classList.add("hide");
    startButton.classList.add("hide");
  };

  const endGame = () => {
    isGameEndShown = true;
    nextButton.addEventListener("click", revealSecretMessage);
    welcomeScreen.classList.remove("hide");
    nextButton.classList.remove("hide");
    endMessage1.classList.remove("hide");
    endHeader1.classList.remove("hide");
    secretMessagePart1.classList.remove("hide");
    secretMessagePart2.classList.remove("hide");
    secretMessagePart3.classList.remove("hide");
    secretMessagePart4.classList.remove("hide");
  };

  // Welcome Screen
  const welcomeScreen = document.getElementById("welcomeScreen");

  nextButton.addEventListener("click", goToMessage2);

  // sounds
  const coinSounds = [
    new Howl({ src: "assets/sounds/Collecting-Money-Coins-B.mp3" }),
    new Howl({ src: "assets/sounds/Collecting-Money-Coins-D.mp3" }),
    new Howl({ src: "assets/sounds/Collecting-Money-Coins-E.mp3" }),
  ];

  const coinSounds2 = [
    new Howl({ src: "assets/sounds/Video-Game-Positive-Sound-A2-8bit.mp3" }),
    new Howl({ src: "assets/sounds/Video-Game-Positive-Sound-A1-8bit.mp3" }),
  ];

  // canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  // comment this line to make the game bigger
  canvas.style.width = 960 + "px";
  // canvas.style.height = 540 + "px";

  const scale = 2;
  canvas.width = Math.floor(960 * scale);
  canvas.height = Math.floor(540 * scale);

  // InputHandler
  class InputHandler {
    constructor(game) {
      this.game = game;
      //  KeyDown
      window.addEventListener("keydown", (e) => {
        if (!this.game.player.isDead && isGameStarted && !isGameFinished) {
          if (
            (e.key === KEYS.arrowUp ||
              e.key === KEYS.arrowRight ||
              e.key === KEYS.arrowLeft ||
              e.key === KEYS.space) &&
            this.game.keys.indexOf(e.key) === -1
          ) {
            this.game.keys.push(e.key);
          } else if (e.key === KEYS.d) {
            // uncomment this line to work with debug Mode
            // this.game.debugMode = !this.game.debugMode;
          }
        }
      });

      // KeyUp;
      window.addEventListener("keyup", (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
        switch (e.key) {
          case KEYS.arrowRight:
            // this.game.player.direction = PLAYER_DIRECTION.right;
            this.game.player.moveState = PLAYER_MOVE_STATE.idle;
            break;
          case KEYS.arrowLeft:
            // this.game.player.direction = PLAYER_DIRECTION.left;
            this.game.player.moveState = PLAYER_MOVE_STATE.idle;
            break;
          default:
            this.game.player.moveState = PLAYER_MOVE_STATE.idle;
            break;
        }
      });
    }
  }

  // TEST confetti snippet
  const confettiParams = {
    // number of confetti per "explosion"
    // number: 70,
    // min and max size for each rectangle
    size: { x: [2, 10], y: [2, 10] },
    // power of explosion
    initSpeed: 25,
    // defines how fast particles go down after blast-off
    gravity: 0.85,
    // how wide is explosion
    drag: 0.000001,
    // how slow particles are falling
    terminalVelocity: 6,
    // how fast particles are rotating around themselves
    flipSpeed: 0.017,
  };
  const colors = [
    { front: "#FFC812", back: "#FFF54D" },
    { front: "#FF5E08", back: "#FFC812" },
    { front: "#ffff00", back: "#FFF54D" },
    { front: "#ffcc00", back: "#ffffff" },
    { front: "#ffffb3", back: "#ff9900" },
    { front: "#ffbf00", back: "#ffffe6" },
    { front: "#ffffff", back: "#ffc61a" },
  ];

  // Confetti constructor
  // function Conf() {
  // this.randomModifier = rand(-1, 1);
  // this.colorPair = colors[Math.floor(rand(0, colors.length))];
  // this.dimensions = {
  //   x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
  //   y: rand(confettiParams.size.y[0], confettiParams.size.y[1]),
  // };
  // this.position = {
  //   x: clickPosition[0],
  //   y: clickPosition[1],
  // };
  // //
  // this.rotation = rand(0, 2 * Math.PI);
  // this.scale = { x: 1, y: 1 };
  // this.velocity = {
  //   x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
  //   y: rand(-confettiParams.initSpeed, confettiParams.initSpeed),
  // };
  // this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;

  //   if (this.position.y <= container.h) {
  //     this.velocity.y = -Math.abs(this.velocity.y);
  //   }

  //   this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;

  //   this.update = function () {
  //     this.velocity.x *= 0.98;
  //     this.position.x += this.velocity.x;

  //     this.velocity.y += this.randomModifier * confettiParams.drag;
  //     this.velocity.y += confettiParams.gravity;
  //     this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
  //     this.position.y += this.velocity.y;

  //     this.scale.y = Math.cos(
  //       (this.position.y + this.randomModifier) * this.flipSpeed
  //     );
  //     this.color =
  //       this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
  //   };
  // }

  // function updateConfetti() {
  //   confettiCtx.clearRect(0, 0, container.w, container.h);

  //   confettiElements.forEach((c) => {
  //     c.update();
  //     confettiCtx.translate(c.position.x, c.position.y);
  //     confettiCtx.rotate(c.rotation);
  //     const width = c.dimensions.x * c.scale.x;
  //     const height = c.dimensions.y * c.scale.y;
  //     confettiCtx.fillStyle = c.color;
  //     confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
  //     confettiCtx.setTransform(1, 0, 0, 1, 0, 0);
  //   });

  //   confettiElements.forEach((c, idx) => {
  //     if (
  //       c.position.y > container.h ||
  //       c.position.x < -0.5 * container.x ||
  //       c.position.x > 1.5 * container.x
  //     ) {
  //       confettiElements.splice(idx, 1);
  //     }
  //   });
  // }

  class Confetti {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.randomModifier = rand(-1, 1);
      this.colorPair = colors[Math.floor(rand(0, colors.length))];
      this.dimensions = {
        x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
        y: rand(confettiParams.size.y[0], confettiParams.size.y[1]),
      };
      this.position = {
        x: x,
        y: y,
      };
      this.rotation = rand(0, 2 * Math.PI);
      this.scale = { x: 1, y: 1 };
      this.velocity = {
        x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
        y: rand(-confettiParams.initSpeed, confettiParams.initSpeed),
      };
      this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;
      //
      // this.spriteSize = 50;
      // this.image = document.getElementById("coin");
      // this.frameX = Math.floor(Math.random() * 3);
      // this.frameY = Math.floor(Math.random() * 3);
      // this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
      // this.size = this.spriteSize * this.sizeModifier;
      // this.speedX = Math.random() * 6 - 3;
      // this.speedY = Math.random() * 6 - 3;
      // this.gravity = 0.5;
      // this.markedForDeletion = false;
      // this.angle = 0;
      // // rotation speed (velocity of angle)
      // this.va = Math.random() * 0.2 - 0.1;
      // this.bounced = 0;
      // this.bottomBounceBoundary = Math.random() * 80 + 60;
      this.topLimit = y + 400;
      this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;
      this.opacity = 1;
    }
    update() {
      // if (this.position.y <= this.game.height) {
      //   this.velocity.y = -Math.abs(this.velocity.y);
      // }
      this.velocity.x *= 0.98;
      this.position.x += this.velocity.x;

      this.velocity.y += this.randomModifier * confettiParams.drag;
      this.velocity.y += confettiParams.gravity;
      this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
      this.position.y += this.velocity.y;
      this.scale.y = Math.cos(
        (this.position.y + this.randomModifier) * this.flipSpeed
      );
      this.color =
        this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;

      // delete
      if (this.opacity > 0) {
        this.opacity = (this.opacity - 0.02).toFixed(2);
      }

      if (
        this.position.y > this.game.height ||
        this.position.x < -0.5 * this.game.width ||
        this.position.x > 1.5 * this.game.width ||
        this.opacity === 0
      ) {
        this.markedForDeletion = true;
      }
      // this.angle += this.va;
      // this.speedY += this.gravity;
      // this.y += this.speedY;
      // this.x -= this.speedX + this.game.speed;
      // if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
      //   this.markedForDeletion = true;
      // }
      // // bouncing
      // if (
      //   this.y > this.game.height - this.bottomBounceBoundary &&
      //   this.bounced < 2
      // ) {
      //   this.speedY = this.speedY * -0.7;
      //   this.bounced++;
      // }
    }
    draw(context) {
      context.save();
      // context.clearRect(0, 0, this.game.width, this.game.height);

      // c.update();
      context.translate(this.position.x, this.position.y);
      context.rotate(this.rotation);
      const width = this.dimensions.x * this.scale.x;
      const height = this.dimensions.y * this.scale.y;
      context.globalAlpha = this.opacity;
      context.fillStyle = this.color;

      context.fillRect(-0.5 * width, -0.5 * height, width, height);
      context.setTransform(1, 0, 0, 1, 0, 0);

      context.restore();
      // context.save();
      // context.translate(this.x, this.y);
      // context.rotate(this.angle);
      // context.drawImage(
      //   this.image,
      //   this.frameX * this.spriteSize,
      //   this.frameY * this.spriteSize,
      //   this.spriteSize,
      //   this.spriteSize,
      //   this.size * -0.5,
      //   this.size * -0.5,
      //   this.size,
      //   this.size
      // );
      // context.restore();
    }
  }
  class Particle {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.spriteSize = 50;
      this.image = document.getElementById("coin");
      this.frameX = Math.floor(Math.random() * 3);
      this.frameY = Math.floor(Math.random() * 3);
      this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
      this.size = this.spriteSize * this.sizeModifier;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 6 - 3;
      this.gravity = 0.5;
      this.markedForDeletion = false;
      this.angle = 0;
      // rotation speed (velocity of angle)
      this.va = Math.random() * 0.2 - 0.1;
      this.bounced = 0;
      this.bottomBounceBoundary = Math.random() * 80 + 60;
    }
    update() {
      this.angle += this.va;
      this.speedY += this.gravity;
      this.y += this.speedY;
      this.x -= this.speedX + this.game.speed;
      if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
        this.markedForDeletion = true;
      }
      // bouncing
      if (
        this.y > this.game.height - this.bottomBounceBoundary &&
        this.bounced < 2
      ) {
        this.speedY = this.speedY * -0.7;
        this.bounced++;
      }
    }
    draw(context) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(
        this.image,
        this.frameX * this.spriteSize,
        this.frameY * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        this.size * -0.5,
        this.size * -0.5,
        this.size,
        this.size
      );
      context.restore();
    }
  }

  // Signs
  class Sign {
    constructor(game, x, type) {
      this.game = game;
      this.x = x;
      this.image =
        type === SIGN_TYPES.right ? IMAGES.signRight : IMAGES.signLeft;
      this.width = 150;
      this.height = 150;
      // this.imageWidth = 242;
      this.imageWidth = 128;
      // this.imageHeight = 148;
      this.imageHeight = 128;
      this.y = GROUND_POSITION_Y - this.height;
    }
    update() {
      // move on player movement
      if (this.game.moveAssetsLeft) {
        this.x -= this.game.speed * 2.5;
      } else if (this.game.moveAssetsRight) {
        this.x += this.game.speed * 2.5;
      }
    }
    draw(context) {
      context.drawImage(
        this.image,
        0,
        0,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
      if (this.game.debugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  class Message {
    constructor(game, x, y, part) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 50;
      this.image = IMAGES.secretMessage[part];
      this.maxWidth = 600;
      this.markedForDeletion = false;
      this.opacity = 1;
    }
    update() {
      // move on player movement
      if (this.game.moveAssetsLeft) {
        this.x -= this.game.speed * 2.5;
      } else if (this.game.moveAssetsRight) {
        this.x += this.game.speed * 2.5;
      }

      // remove
      if (this.width >= this.maxWidth) {
        this.markedForDeletion = true;
        this.game.messagesToDraw.push(this);
      }
      // move up
      this.x -= 3;
      this.y -= 8;
      this.width += 6;
      this.height += 6;
      // opacity
      // this.opacity = (this.opacity - 0.01).toFixed(2);
    }
    draw(context) {
      context.save();
      context.globalAlpha = this.opacity;
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.restore();
    }
  }

  class Chest {
    constructor(game, x) {
      this.game = game;
      this.image = IMAGES.chest;
      this.width = 110;
      this.height = 115;
      this.x = x;
      this.y = GROUND_POSITION_Y - this.height + 10;
      this.frameX = 0;
      this.maxFrameX = 5;
      this.open = false;
      this.fps = 15;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      // coins
      this.coins = [];
      this.coinsInChest = 10;
      this.maxCoinsInChest = this.coinsInChest;
      this.coinsReleased = false;
      this.coinTargetX = 25;
      this.coinTargetY = 90;
      this.coinSoundPlayed = 0;
      this.readyForNextLevel = false;
      this.nextLevelInterval = 400;
      this.confettiReleased = false;
    }
    update(deltaTime) {
      // move on player movement
      if (this.game.moveAssetsLeft) {
        this.x -= this.game.speed * 2.5;
      } else if (this.game.moveAssetsRight) {
        this.x += this.game.speed * 2.5;
      }

      if (this.coinsInChest === 0) {
        setTimeout(() => {
          this.readyForNextLevel = true;
        }, this.nextLevelInterval);
      }
      // changing frames on open
      if (this.open) {
        // if (!this.confettiReleased) {
        //   this.game.releaseConfetti(100, this.x, this.y);
        //   this.confettiReleased = true;
        // }
        if (this.frameX >= this.maxFrameX) {
          this.frameX = 5;
        } else if (this.frameTimer >= this.frameInterval) {
          this.frameX++;
          this.frameTimer = 0;
        } else {
          this.frameTimer += deltaTime;
        }
        // releasing coins
        if (!this.coinsReleased) {
          // this.releaseCoins(3);
          if (this.coinsInChest === this.maxCoinsInChest) {
            this.coins.push(
              new ChestCoin(
                this.game,
                this.x + this.width / 2,
                this.y + this.height / 2
              )
            );
            this.coinsInChest--;
          } else if (this.coinsInChest > 0) {
            if (this.coins[this.coins.length - 1].x < 401) {
              this.coins.push(
                new ChestCoin(
                  this.game,
                  this.x + this.width / 2,
                  this.y + this.height / 2
                )
              );
              this.coinsInChest--;
            }
          }
        }
      }
      this.coins.forEach((coin) => {
        if (Math.floor(coin.x) > this.coinTargetX + 5) {
          coin.x -= ((coin.x - this.coinTargetX) / 10).toFixed(1);
          coin.y -= ((coin.y - this.coinTargetY) / 10).toFixed(1);
          if (!coin.soundPlayed && coin.x < 600) {
            coinSounds[0].play();
            coin.soundPlayed = true;
            this.game.score++;
          }
        } else {
          coin.markedForDeletion = true;
        }
        coin.update();
      });
      this.coins = this.coins.filter((coin) => !coin.markedForDeletion);
      // 20,75
    }
    draw(context) {
      context.drawImage(
        this.image,
        77 + (130 + 18) * this.frameX,
        48,
        130,
        160,
        this.x,
        this.y,
        this.width,
        this.height
      );
      if (this.game.debugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

      this.coins.forEach((coin) => coin.draw(context));
    }
    releaseCoins(numberOfCoins) {
      this.coinsReleased = true;
      for (let i = 0; i < numberOfCoins; i++) {
        this.coins.push(new Coin(this.game, this.x, this.y));
      }
    }
  }
  class Collectibles {
    constructor(game) {
      this.game = game;
      // this.y =
      //   Math.floor(Math.random() * 220) +
      //     (GROUND_POSITION_Y - this.game.player.height - 270);
      this.width = 50;
      this.height = 50;
      this.markedForDeletion = false;
    }
    update() {
      if (this.isChestCoin) {
        return;
      }

      // move left/right on player move
      if (this.game.moveAssetsLeft) {
        this.x -= this.game.speed * 2.5;
      } else if (this.game.moveAssetsRight) {
        this.x += this.game.speed * 2.5;
      }

      // hide if outside left wall
      // if (this.x + this.width < 0) {
      //   this.markedForDeletion = true;
      // }
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      if (this.game.debugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  // Coin
  class Coin extends Collectibles {
    constructor(game, x, y) {
      super(game);
      this.image = IMAGES.coin;
      this.x = x;
      this.y = y;
    }
  }

  // Chest Coin
  class ChestCoin extends Coin {
    constructor(game, x, y) {
      super(game, x, y);
      // used for chest coins
      this.soundPlayed = false;
      this.isChestCoin = true;
    }
  }

  class Key extends Collectibles {
    constructor(game, x, y) {
      super(game);
      this.image = IMAGES.key;
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 100;
    }
  }

  // Mean Potato
  class MeanPotato {
    constructor(game, x, speed) {
      this.game = game;
      this.type = [JELLY_TYPES.vertical, JELLY_TYPES.horizontal][random(0, 2)];
      this.imageJelly = IMAGES.jelly;
      this.images = IMAGES.slime;
      this.drawnWidth = 150;
      this.width = this.drawnWidth - 50;
      this.imageWidth = 510;
      this.drawnHeight = 120;
      this.height = this.drawnHeight - 65;
      this.imageHeight = 410;
      this.x = x;
      this.y = GROUND_POSITION_Y - this.height;
      this.minX = this.x;
      this.maxX = this.x + 350;
      this.minY = this.y - 400;
      this.maxY = this.y;
      this.goesRight = true;
      this.goesUP = true;
      this.frameX = 0;
      // this.maxFrameX = 5;
      this.maxFrameX = 28;
      this.fps = 30;
      this.timer = 0;
      this.interval = 1000 / this.fps;
      this.inCollision = false;
      this.speed = speed;
    }
    update(deltaTime) {
      // move left/right on player move
      if (this.game.moveAssetsLeft) {
        this.x -= this.game.speed * 2.5;
        this.maxX -= this.game.speed * 2.5;
        this.minX -= this.game.speed * 2.5;
      } else if (this.game.moveAssetsRight) {
        this.x += this.game.speed * 2.5;
        this.minX += this.game.speed * 2.5;
        this.maxX += this.game.speed * 2.5;
      }

      // changing frames
      if (this.frameX < this.maxFrameX) {
        if (this.timer >= this.interval) {
          this.frameX++;
          this.timer = 0;
        } else {
          this.timer += deltaTime;
        }
      } else {
        this.frameX = 0;
      }

      if (this.type === JELLY_TYPES.vertical) {
        // VERTICAL TYPE
        // move up and down
        if (this.y <= this.minY) {
          this.goesUP = true;
          this.y += this.speed;
        } else if (this.goesUP && this.y < this.maxY) {
          this.y += this.speed;
        } else if (this.y >= this.maxY) {
          this.goesUP = false;
          this.y -= this.speed;
        } else if (!this.goesUP && this.y < this.maxY) {
          this.y -= this.speed;
        }
      } else if (this.type === JELLY_TYPES.horizontal) {
        // HORIZONTAL TYPE
        // move right and left
        if (this.x <= this.minX) {
          this.goesRight = true;
          this.x += this.speed;
        } else if (this.goesRight && this.x < this.maxX) {
          this.x += this.speed;
        } else if (this.x >= this.maxX) {
          this.goesRight = false;
          this.x -= this.speed;
        } else if (!this.goesRight && this.x < this.maxX) {
          this.x -= this.speed;
        }
      }
    }
    draw(context) {
      // context.fillRect(this.x, this.y, this.width, this.height);
      if (this.game.debugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }
      context.drawImage(
        this.images[this.frameX],
        // this.imageJelly,
        0,
        0,
        this.imageWidth,
        this.imageHeight,
        this.x - 30,
        this.y - 30,
        this.drawnWidth,
        this.drawnHeight
      );
    }
  }

  // Layer
  class Layer {
    constructor(game, image, speedModifier) {
      this.game = game;
      this.image = image;
      this.speedModifier = speedModifier;
      this.width = this.game.width;
      this.height = this.game.height;
      this.x = 0;
      this.y = 0;
    }
    update() {
      // reset to x = 0 if behind left border
      if (this.x <= -this.width) this.x = 0;

      this.minX += this.game.speed * 2.5;
      // move right/left on player move
      if (this.game.moveAssetsLeft) {
        this.x -= this.game.speed * this.speedModifier;
      } else if (this.game.moveAssetsRight) {
        this.x += this.game.speed * this.speedModifier;
        if (this.x >= this.game.width) this.x = 0;
      }
    }
    draw(context) {
      // left part cut
      context.drawImage(this.image, this.x - this.width, this.y);
      // main part whole
      context.drawImage(this.image, this.x, this.y);
      // right part cut
      context.drawImage(this.image, this.x + this.width, this.y);
    }
  }

  // Background
  class Background {
    constructor(game) {
      this.game = game;
      // this.image1 = document.getElementById("layer1-small");
      // this.image2 = document.getElementById("layer2-small");
      // this.image3 = document.getElementById("layer3-small");
      // this.image4 = document.getElementById("layer4-small");
      // this.image5 = document.getElementById("layer5-small");
      // this.image6 = document.getElementById("layer6-small");

      this.layer1 = new Layer(this.game, IMAGES.layer1, 0.2);
      this.layer2 = new Layer(this.game, IMAGES.layer2, 0.4);
      this.layer3 = new Layer(this.game, IMAGES.layer3, 0.8);
      this.layer4 = new Layer(this.game, IMAGES.layer4, 1);
      this.layer5 = new Layer(this.game, IMAGES.layer5, 1.5);
      this.layer6 = new Layer(this.game, IMAGES.layer6, 2);
      this.layer7 = new Layer(this.game, IMAGES.layer7, 2.5);
      this.layers = [
        this.layer1,
        this.layer2,
        this.layer3,
        this.layer4,
        this.layer5,
        this.layer6,
        // Last layer will be drawn after the player
      ];
    }
    update() {
      this.layers.forEach((layer) => layer.update());
      this.layer7.update();
    }
    draw(context) {
      this.layers.forEach((layer) => layer.draw(context));
    }
  }

  class WelcomeScreen {
    constructor(game) {
      this.game = game;
      this.image = IMAGES.welcomeScreen;
      this.width = 806 * 1.5;
      this.height = 635 * 1.5;
      this.x = this.game.width / 2 - this.width / 2;
      this.y = this.game.height / 2 - this.height / 2;
    }
    update() {}
    draw(context) {
      context.save();
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.fillStyle = "white";
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";

      context.restore();
    }
  }

  // UI
  class UI {
    constructor(game) {
      this.game = game;
      this.fontSizeSmall = 44;
      this.fontSizeBig = 90;
      this.fontFamily = "Bangers";
      this.color = "white";
      this.heartImage = IMAGES.heart;
      this.keyImage = IMAGES.key;
      this.instructions = INSTRUCTIONS;
      this.isNew = true;
      this.welcomeScreen = new WelcomeScreen(this.game);
    }
    draw(context) {
      context.save();

      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      // this is very expensive!
      context.shadowColor = "black";
      // score

      // context.fillText("Score: " + this.game.score, 20, 40);
      // timer
      // const formattedTime = Math.floor(this.game.gameTime * 0.001);
      // context.fillText("Timer: " + formattedTime, 20, 100);
      context.textAlign = "center";
      context.font = this.fontSizeBig + "px " + this.fontFamily;
      if (this.game.player.isDead) {
        context.fillText(
          // this.instructions.collectCoins,
          "Whoopsy...",
          this.game.width * 0.5,
          300
        );
      } else if (this.game.collectedKeys < this.game.maxReleasedKeys) {
        const keysToFind = this.game.maxReleasedKeys - this.game.collectedKeys;
        context.fillText(
          this.instructions.findKeys[keysToFind],
          this.game.width * 0.5,
          300
        );
      } else if (
        this.game.collectedKeys === this.game.maxReleasedKeys &&
        this.game.chest &&
        !this.game.chest.open
      ) {
        context.fillText(
          this.instructions.openChest,
          this.game.width * 0.5,
          300
        );
      }
      if (this.game.chest && this.game.chest.open) {
        context.fillText("Yay!", this.game.width * 0.5, 300);
      }
      // game over messages
      // if (this.game.gameOver) {
      //   context.textAlign = "center";
      //   let message1;
      //   let message2;
      //   if (this.game.score >= this.game.winningScore) {
      //     message1 = "Most Wondrous!";
      //     message2 = "Well done explorer!";
      //   } else {
      //     message1 = "Blazes!";
      //     message2 = "Oil the gears and try again!";
      //   }
      //   context.font = "100px " + this.fontFamily;
      //   context.fillText(
      //     message1,
      //     this.game.width * 0.5,
      //     this.game.height * 0.5 - 20
      //   );
      //   context.font = "25px " + this.fontFamily;
      //   context.fillText(
      //     message2,
      //     this.game.width * 0.5,
      //     this.game.height * 0.5 + 20
      //   );
      // }

      // ammo
      // for (let i = 0; i < game.ammo; i++) {
      //   context.fillRect(20 + 5 * i, 50, 3, 20);
      // }

      context.font = this.fontSizeSmall + "px " + this.fontFamily;

      // mode
      context.fillText(
        "mode " + gameMode + " - level " + this.game.level,
        this.game.width / 2,
        55
      );
      // level
      // context.fillText(
      //   "level " + this.game.level,
      //   this.game.width / 2 + 100,
      //   55
      // );
      context.textAlign = "left";
      // coins collected
      context.fillText(this.game.score, 85, 130);
      // context.fillText(
      //   this.game.collectedKeys + " / " + this.game.maxReleasedKeys,
      //   80,
      //   170
      // );

      // remove shadows before drawing images
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      // coin
      context.drawImage(
        IMAGES.coin,
        25,
        90,
        this.heartImage.width - 15,
        this.heartImage.height - 15
      );

      if (!this.game.messagesToDraw[0]) {
        context.globalAlpha = 0.3;
      }
      context.drawImage(
        secretMessagePart1,
        this.game.width - 280,
        20,
        this.heartImage.width,
        this.heartImage.height
      );

      if (!this.game.messagesToDraw[1]) {
        context.globalAlpha = 0.3;
      }
      context.drawImage(
        secretMessagePart2,
        this.game.width - 220,
        20,
        this.heartImage.width,
        this.heartImage.height
      );

      if (!this.game.messagesToDraw[2]) {
        context.globalAlpha = 0.3;
      }
      context.drawImage(
        secretMessagePart3,
        this.game.width - 160,
        20,
        this.heartImage.width,
        this.heartImage.height
      );

      if (!this.game.messagesToDraw[3]) {
        context.globalAlpha = 0.3;
      }
      context.drawImage(
        secretMessagePart4,
        this.game.width - 100,
        20,
        this.heartImage.width,
        this.heartImage.height
      );
      context.globalAlpha = 1;

      // lifes
      for (let i = 0; i < this.game.maxLifes; i++) {
        if (this.game.player.lifes < i + 1) {
          context.globalAlpha = 0.3;
        }
        context.drawImage(
          this.heartImage,
          20 + i * 60,
          10,
          this.heartImage.width,
          this.heartImage.height
        );
      }
      context.globalAlpha = 1;
      // keys collected
      for (let i = 0; i < this.game.maxReleasedKeys; i++) {
        if (this.game.collectedKeys < i + 1) {
          context.globalAlpha = 0.3;
        }
        context.drawImage(
          this.keyImage,
          this.game.width - 100 - i * 60,
          20 + 64 + 20,
          this.heartImage.width,
          this.heartImage.height
        );
      }

      context.restore();
    }
  }

  // Game
  class Game {
    constructor(width, height) {
      // PROPERTIES THAT DON'T CHANGE
      this.isGameStarted = isGameStarted;
      this.width = width;
      this.height = height;
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.maxLevel = 4;
      this.messagesToDraw = [];
      this.maxLifes = 3;

      this.sadSound = new Howl({
        src: "assets/sounds/breviceps__8-bit-error.wav",
      });
      this.levelUpSound = new Howl({
        src: "assets/sounds/level-up/397355__plasterbrain__tada-fanfare-a.flac",
      });
      this.finalSuccessSound = new Howl({
        src: "assets/sounds/level-up/456966__funwithsound__success-fanfare-trumpets.mp3",
      });

      // PROPERTIES THAT GET RESET TO DEFAULT ON EVERY LEVEL AND RESTART
      this.background = new Background(this);
      this.player = new Player(this);
      this.messages = [];
      this.keys = [];
      this.coins = [
        new Coin(this, this.width / 2 + 300, GROUND_POSITION_Y - 100),
        new Coin(this, this.width / 2 + 600, GROUND_POSITION_Y - 100),
        new Coin(this, this.width / 2 + 900, GROUND_POSITION_Y - 100),
        new Coin(this, this.width / 2 + 1300, GROUND_POSITION_Y - 100),
      ];
      this.chest = undefined;
      this.collectibleKeys = [];
      this.collectedKeys = 0;
      this.releasedKeys = 0;
      this.newCoinY = this.height - 500;
      this.maxCoinY = this.height - 600;
      this.coinsCounter = this.coins.length;
      this.gameOver = false;
      this.score = 0;
      this.scoreBeforeThisLevel = 0;
      this.speed = GAME_SPEED.normal;
      this.collisionTimer = 0;
      this.lifeSubstractionTimer = 0;
      this.collisionMaxTime = 1200;
      this.levelUpSoundPlayed = false;
      this.leftSign = new Sign(this, 200, SIGN_TYPES.right);
      this.rightSign = undefined;
      this.leftBoundaryOn = false;
      this.rightBoundaryOn = false;
      this.moveAssetsLeft = false;
      this.moveAssetsRight = false;

      // TODO: remove before launch
      this.debugMode = false;

      this.particles = [];
      this.confetti = [];

      // PROPERTIES THAT CHANGE BASED ON LEVEL
      this.setLevelBasedProperties(1);
      this.isLevelSet = false;
    }
    update(deltaTime) {
      this.isGameStarted = isGameStarted;

      if (isGameStarted && !this.isLevelSet) {
        this.setLevelBasedProperties(1);
        this.isLevelSet = true;
      }

      // move assets left or right
      if (this.keys.includes(KEYS.arrowRight) && !this.rightBoundaryOn) {
        this.moveAssetsLeft = true;
        this.moveAssetsRight = false;
      } else if (this.keys.includes(KEYS.arrowLeft) && !this.leftBoundaryOn) {
        this.moveAssetsLeft = false;
        this.moveAssetsRight = true;
      } else {
        this.moveAssetsLeft = false;
        this.moveAssetsRight = false;
      }

      // go to next level
      if (this.chest) {
        if (this.chest.open && !this.levelUpSoundPlayed) {
          this.messages.push(
            new Message(
              this,
              this.chest.x + this.chest.width / 2,
              this.chest.y + this.chest.height / 2,
              this.level
            )
          );
          if (this.level === this.maxLevel) {
            this.finalSuccessSound.play();
          } else {
            this.levelUpSound.play();
          }

          this.levelUpSoundPlayed = true;
        }
        if (this.chest.readyForNextLevel) {
          if (this.level === this.maxLevel) {
            isGameFinished = true;
          } else {
            this.goToNextLevel();
          }
        }
      }

      // signs
      this.leftSign.update();
      this.rightSign && this.rightSign.update();

      // keys
      this.collectibleKeys.forEach((key) => {
        key.update();
        // collect key
        if (this.checkCollision(this.player, key)) {
          this.collectKey(key);
        }
      });
      this.collectibleKeys = this.collectibleKeys.filter(
        (key) => !key.markedForDeletion
      );

      // chest
      if (this.releasedKeys === this.maxReleasedKeys && !this.chest) {
        this.addChest(this);
      }

      if (this.chest) {
        this.chest.update(deltaTime);
        this.rightSign = new Sign(this, this.chest.x + 600, SIGN_TYPES.left);
        // open chest on collision with player
        if (this.collectedKeys === this.maxReleasedKeys) {
          if (this.checkCollision(this.player, this.chest)) {
            this.chest.open = true;
          }
        }
      }

      // Jellies
      this.lifeSubstractionTimer += deltaTime;
      this.addJellyAfterDistance(this.jellyDistance);
      this.jellies.forEach((jelly) => {
        jelly.update(deltaTime);
        if (this.checkCollision(this.player, jelly)) {
          if (this.chest && this.chest.open) {
            return;
          }
          this.player.hit = true;
          if (jelly.inCollision) {
            if (this.collisionTimer >= this.collisionMaxTime) {
              this.player.lifes--;
              this.sadSound.play();
              this.collisionTimer = 0;
              this.lifeSubstractionTimer = 0;
            } else {
              this.collisionTimer += deltaTime;
              // this.lifeSubstractionTimer += deltaTime;
            }
          } else {
            if (this.lifeSubstractionTimer >= 1500) {
              this.player.lifes--;
              this.collisionTimer = 0;
              this.lifeSubstractionTimer = 0;
              this.sadSound.play();
              jelly.inCollision = true;
            } else {
              this.collisionTimer += deltaTime;
              // this.lifeSubstractionTimer += deltaTime;
            }
          }
        } else {
          jelly.inCollision = false;
        }
      });

      // background
      this.background.update();

      // player
      this.player.update(deltaTime);

      // coins
      this.coins.forEach((coin) => {
        coin.update();
        // collect coin
        if (this.checkCollision(this.player, coin)) {
          this.collectCoin(coin);
          // this.releaseParticles(5, coin.x, coin.y);
          // this.releaseConfetti(10, coin.x, coin.y);
        }
      });
      this.coins = this.coins.filter((coin) => !coin.markedForDeletion);
      // new coin Y
      if (this.newCoinY < this.maxCoinY) {
        this.newCoinY += 30;
      } else {
        this.newCoinY -= 30;
      }

      // add coin
      this.addCoinAfterDistance(this.coinDistance);

      // particles
      this.particles.forEach((particle) => particle.update());
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      // confetti
      this.confetti.forEach((element) => element.update());
      this.confetti = this.confetti.filter(
        (element) => !element.markedForDeletion
      );

      // messages
      this.messages.forEach((message) => message.update());
      this.messages = this.messages.filter(
        (message) => !message.markedForDeletion
      );

      // explosions
      // this.explosions.forEach((explosion) => explosion.update(deltaTime));
      // this.explosions = this.explosions.filter(
      //   (explosion) => !explosion.markedForDeletion
      // );
      // enemies
      // this.enemies.forEach((enemy) => {
      //   enemy.update();
      //   //  collision with player
      //   if (this.checkCollision(this.player, enemy)) {
      //     enemy.markedForDeletion = true;
      //     if (enemy.type === "lucky") {
      //       this.player.enterPowerUp();
      //     } else {
      //       this.addExplosion(enemy);
      //       this.releaseParticles(
      //         enemy.score,
      //         enemy.x + enemy.width * 0.5,
      //         enemy.y + enemy.height * 0.5
      //       );
      //       this.player.hit = true;
      //       if (!this.gameOver) this.score--;
      //     }
      //   }
      // this.player.projectiles.forEach((projectile) => {
      //   // collision with projectile
      //   if (this.checkCollision(projectile, enemy)) {
      //     projectile.markedForDeletion = true;
      //     enemy.lives--;
      //     this.releaseParticles(
      //       1,
      //       enemy.x + enemy.width * 0.5,
      //       enemy.y + enemy.height * 0.5
      //     );
      //     if (enemy.lives <= 0) {
      //       enemy.markedForDeletion = true;

      //       this.releaseParticles(
      //         enemy.score,
      //         enemy.x + enemy.width * 0.5,
      //         enemy.y + enemy.height * 0.5
      //       );
      //       this.addExplosion(enemy);
      //       if (!this.gameOver) this.score += enemy.score;
      //       if (this.score >= this.winningScore) this.gameOver = true;
      //     }
      //   }
      // });
      // });
      // handle left and right game boundaries
      // left
      if (this.player.x <= this.leftSign.x + this.leftSign.width - 10) {
        this.leftBoundaryOn = true;
      } else {
        this.leftBoundaryOn = false;
      }
      // right
      if (this.rightSign) {
        if (this.player.x + this.player.width >= this.rightSign.x + 10) {
          this.rightBoundaryOn = true;
        } else {
          this.rightBoundaryOn = false;
        }
      }

      // reset when player dead
      if (
        this.player.lifes === 0 &&
        this.player.y > this.height + this.player.height / 2
      ) {
        this.restart();
      }
    }
    draw(context) {
      this.background.draw(context);
      this.chest && this.chest.draw(context);
      this.player.draw(context);

      // this.enemies.forEach((enemy) => enemy.draw(context));
      // this.explosions.forEach((explosion) => explosion.draw(context));
      this.particles.forEach((particle) => particle.draw(context));
      this.confetti.forEach((element) => element.draw(context));
      this.coins.forEach((coin) => coin.draw(context));
      this.jellies.forEach((jelly) => jelly.draw(context));
      this.collectibleKeys.forEach((key) => key.draw(context));
      this.leftSign.draw(context);
      this.rightSign && this.rightSign.draw(context);
      this.ui.draw(context);
      this.messages.forEach((message) => message.draw(context));

      // layer7 is a foreground so we draw it after we draw everything else
      this.background.layer7.draw(context);
    }

    // addExplosion(enemy) {
    //   const randomize = Math.random();
    //   const x = enemy.x + enemy.width * 0.5;
    //   const y = enemy.y + enemy.height * 0.5;
    //   if (randomize < 0.5) {
    //     this.explosions.push(new SmokeExplosion(this, x, y));
    //   } else {
    //     this.explosions.push(new FireExplosion(this, x, y));
    //   }
    // }
    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    }
    releaseParticles(numOfParticles, x, y) {
      for (let i = 0; i < numOfParticles; i++) {
        this.particles.push(new Particle(this, x, y));
      }
    }
    releaseConfetti(numOfElements, x, y) {
      for (let i = 0; i < numOfElements; i++) {
        this.confetti.push(new Confetti(this, x, y));
      }
    }
    collectCoin(coin) {
      coin.markedForDeletion = true;
      this.score++;
      // play coin sound
      coinSounds[Math.floor(Math.random() * coinSounds.length)].play();
    }
    collectKey(key) {
      this.collectedKeys++;
      key.markedForDeletion = true;
      // play key sound
      coinSounds2[0].play();
    }
    addKey() {
      this.collectibleKeys.push(new Key(this, this.width, this.newCoinY));
      this.releasedKeys++;
    }
    addCoinAfterDistance(distance) {
      if (this.chest) {
        return;
      }
      const lastCoin = this.coins[this.coins.length - 1];
      const lastKey = this.collectibleKeys[this.collectibleKeys.length - 1];

      if (lastCoin && lastCoin.x < this.width - distance) {
        if (this.coinsCounter > this.coinsBeforeKey) {
          this.addKey();
          this.coinsCounter = 0;
        } else {
          if (lastKey) {
            if (lastKey.x < this.width - distance) {
              this.coins.push(new Coin(this, this.width, this.newCoinY));
              this.coinsCounter++;
            }
          } else {
            this.coins.push(new Coin(this, this.width, this.newCoinY));
            this.coinsCounter++;
          }
        }
      }
    }
    addChest() {
      this.chest = new Chest(this, this.width + 700);
    }
    releaseCoinsFromChest(numberOfCoins) {
      this.coinsReleased = true;
      for (let i = 0; i < numberOfCoins; i++) {
        this.coins.push(new Coin(this.game, this.x, this.y));
      }
    }
    addJellyAfterDistance(distance) {
      if (this.chest) {
        return;
      }
      if (this.jellies.length > 0) {
        const lastJelly = this.jellies[this.jellies.length - 1];
        if (lastJelly && lastJelly.x < this.width - distance) {
          const randomSpeed =
            Math.floor(
              Math.random() * (this.jellySpeedMax - this.jellySpeedMin)
            ) + this.jellySpeedMin;
          this.jellies.push(new MeanPotato(this, this.width, randomSpeed));
        }
      }
    }
    resetDefaultProperties() {
      // reset game
      this.background = new Background(this);
      this.player = new Player(this);
      this.keys = [];
      this.coins = [
        new Coin(this, this.width / 2 + 300, GROUND_POSITION_Y - 100),
        new Coin(this, this.width / 2 + 600, GROUND_POSITION_Y - 100),
        new Coin(this, this.width / 2 + 900, GROUND_POSITION_Y - 100),
        new Coin(this, this.width / 2 + 1300, GROUND_POSITION_Y - 100),
      ];
      this.chest = undefined;

      this.collectibleKeys = [];
      this.collectedKeys = 0;
      this.releasedKeys = 0;
      this.newCoinY = this.height - 450;
      this.maxCoinY = this.height - 550;
      this.coinsCounter = this.coins.length;
      this.gameOver = false;
      this.score = this.scoreBeforeThisLevel;
      this.scoreBeforeThisLevel = this.scoreBeforeThisLevel;
      this.speed = GAME_SPEED.normal;
      this.collisionTimer = 0;
      this.lifeSubstractionTimer = 0;
      this.collisionMaxTime = 1200;
      this.levelUpSoundPlayed = false;
      this.leftSign = new Sign(this, 200, SIGN_TYPES.right);
      this.rightSign = undefined;
      this.leftBoundaryOn = false;
      this.rightBoundaryOn = false;
      this.moveAssetsLeft = false;
      this.moveAssetsRight = false;
      // TODO: remove before launch
      this.debugMode = false;
    }
    setLevelBasedProperties(level) {
      this.level = LEVEL_CONFIG[gameMode][level].level;
      this.maxReleasedKeys = LEVEL_CONFIG[gameMode][level].maxReleasedKeys;
      this.coinsBeforeKey = LEVEL_CONFIG[gameMode][level].coinsBeforeKey;
      this.jellyDistance = LEVEL_CONFIG[gameMode][level].jellyDistance;
      this.coinDistance = LEVEL_CONFIG[gameMode][level].coinDistance;
      this.jellySpeedMin = LEVEL_CONFIG[gameMode][level].jellySpeedMin;
      this.jellySpeedMax = LEVEL_CONFIG[gameMode][level].jellySpeedMax;
      this.jellies = [
        new MeanPotato(
          this,
          this.width + this.jellyDistance,
          this.jellySpeedMin
        ),
      ];
    }
    restart() {
      this.resetDefaultProperties();
      this.setLevelBasedProperties(this.level);
    }
    goToNextLevel() {
      // reassign messages
      const messages = this.messages;
      // reassign score
      const score = this.score;
      // reset basic game properties
      this.resetDefaultProperties();
      this.messages = messages;
      this.score = score;
      this.scoreBeforeThisLevel = score;
      // update config game propertiws based on level
      this.setLevelBasedProperties(this.level + 1);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  let framesCounter = 0;
  // animation loop
  const animate = (timeStamp) => {
    if (!isGameStarted) {
      canvas.style.opacity = "0.5";
    } else {
      canvas.style.opacity = "1";
    }
    if (isGameFinished && !isGameEndShown) {
      endGame();
    }

    // Time between this and previous animation loop
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    framesCounter++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  };
  animate(0);
  setInterval(() => {
    // console.log("framesCounter", framesCounter);
    framesCounter = 0;
  }, 1000);

  // const heart = document.getElementById("heart-xsmall");
  // heart.classList.add("lifes");
});
