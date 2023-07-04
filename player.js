import {
  KEYS,
  GROUND_POSITION_Y,
  PLAYER_MOVE_STATE,
  PLAYER_DIRECTION,
  GAME_SPEED,
  DEFAULT_VALUES,
} from "./constants.js";

import { IMAGES } from "./images.js";

const DEFAULT = DEFAULT_VALUES.player;

const playerDeadSound = new Howl({
  src: "assets/sounds/gameover-short/475347__fupicat__videogame-death-sound.wav",
});

// const footStepSound = new Howl({
//   src: "./assets/sounds/Single-Barefoot-Footstep-C.mp3",
//   autoplay: true,
//   loop: true,
//   rate: 0.8,
//   volume: 0.3,
// });
// const playingsteps = footStepSound.play();
// sound.rate(1.5, id2);

// Player
export default class Player {
  constructor(game) {
    this.game = game;
    this.sizeFactor = 2;
    // TODO: face
    this.faceImage = document.getElementById("dog2");
    this.faceWidth = 125;
    this.faceHeight = 125;
    this.heightAdjustment = 60;
    this.widthAdjustment = 40;
    this.width = DEFAULT.width * this.sizeFactor - this.widthAdjustment;
    this.height = DEFAULT.height * this.sizeFactor - this.heightAdjustment;
    this.imageWidth = DEFAULT.imageWidth * this.sizeFactor;
    this.imageHeight = DEFAULT.imageHeight * this.sizeFactor;
    this.x = this.game.width / 2 - this.width / 2;
    this.defaultY = GROUND_POSITION_Y - this.height + 10;
    this.y = this.defaultY - this.heightAdjustment;
    this.speedX = DEFAULT.speed;
    this.projectiles = [];
    this.moveState = PLAYER_MOVE_STATE.idle;
    this.direction = PLAYER_DIRECTION.right;
    // running FlatBoy
    this.idleImages = IMAGES.player.idle;
    this.runningImages = IMAGES.player.run;
    this.jumpingImage = IMAGES.player.jump;

    //
    this.frameX = DEFAULT.frameX;
    this.maxFrameX = DEFAULT.maxFrameX;
    this.maxFrameX = DEFAULT.maxFrameX;
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;
    this.hit = false;
    this.hitTimer = 0;
    this.hitTimeLimit = 200;
    // changing images
    this.imagesFps = 30;
    this.imagesTimer = 0;
    this.imagesInterval = 1000 / this.imagesFps;
    // jumpimg
    this.isJumping = false;
    this.isSmallJump = false;
    this.isBigJump = false;
    this.isJumping = false;
    this.jumpingTimer = 0;
    this.jumpingFps = 30;
    this.smallJumpInterval = (1000 / this.jumpingFps) * 40;
    this.bigJumpInterval = 1500;
    this.smallJumpSpeed = 15;
    this.bigJumpSpeed = 40;
    this.jumpVelocity = 4;
    this.jumpingFrame = 0;
    this.jumpingFrame = 0;
    this.maxJumpingFrame = 14;
    this.arrowUpCounter = 0;
    // the bigger the longer a key needs to be held
    this.bigJumpTrigger = 10;
    this.lifes = 3;
    this.counter = 0;
    this.isDead = false;
    this.isNew = true;
    this.fallVelocity = 3;
  }
  update(deltaTime) {
    if (!this.game.isGameStarted) {
      return;
    }
    // move state
    if (this.game.keys.includes(KEYS.arrowUp)) {
      this.moveState = PLAYER_MOVE_STATE.jump;
      if (this.game.keys.includes(KEYS.arrowRight)) {
        this.direction = PLAYER_DIRECTION.right;
      }
      if (this.game.keys.includes(KEYS.arrowLeft)) {
        this.direction = PLAYER_DIRECTION.left;
      }
    } else if (this.game.keys.includes(KEYS.arrowRight)) {
      this.moveState = PLAYER_MOVE_STATE.run;
      this.direction = PLAYER_DIRECTION.right;
    } else if (this.game.keys.includes(KEYS.arrowLeft)) {
      this.moveState = PLAYER_MOVE_STATE.run;
      this.direction = PLAYER_DIRECTION.left;
    } else {
      // this.moveState = PLAYER_MOVE_STATE.idle;
    }
    // footstep sound
    // if (this.moveState === PLAYER_MOVE_STATE.run) {
    //   footStepSound.play();
    // }
    if (this.isNew) {
      if (this.y < GROUND_POSITION_Y - this.height) {
        this.y += 2 * this.fallVelocity;
        this.fallVelocity += 0.22;
      } else {
        this.y = this.defaultY;
        this.isNew = false;
        this.fallVelocity = 3;
      }
    }
    // handle dead
    if (this.lifes === 0) {
      if (!this.isDead) {
        playerDeadSound.play();
      }
      this.isDead = true;
    }
    if (this.isDead) {
      this.y += 0.7 * this.fallVelocity;
      this.fallVelocity += 0.12;

      return;
    }

    // changing character images
    if (this.frameX < this.maxFrameX) {
      if (this.imagesTimer >= this.imagesInterval) {
        this.frameX++;
        this.imagesTimer = 0;
      } else {
        this.imagesTimer += deltaTime;
      }
    } else {
      this.frameX = 0;
    }

    // jumping
    if (this.game.keys.includes(KEYS.arrowUp)) {
      this.arrowUpCounter++;
      // enable big jump if is already jumping
      if (this.isJumping && this.arrowUpCounter > this.bigJumpTrigger) {
        this.isBigJump = true;
      } else {
        this.isJumping = true;
        this.imagesTimer = 0;
      }
    }

    // update size when jumping
    if (this.isJumping) {
      this.width = 110 * this.sizeFactor - this.widthAdjustment;
      this.height = 155 * this.sizeFactor - this.heightAdjustment;
    } else {
      this.width = 100 * this.sizeFactor - this.widthAdjustment;
      this.height = 155 * this.sizeFactor - this.heightAdjustment;
    }
    if (this.isJumping) {
      // footStepSound.pause();
      const jumpInterval = this.isBigJump
        ? this.bigJumpInterval
        : this.smallJumpInterval;
      const jumpSpeed = this.isBigJump
        ? this.bigJumpSpeed
        : this.smallJumpSpeed;
      if (this.jumpingTimer < jumpInterval) {
        this.jumpingTimer += deltaTime;
        this.counter++;

        if (this.jumpingTimer < jumpInterval / 2) {
          // go up
          this.y -= 3 * this.jumpVelocity;
          this.jumpVelocity -= 0.09;
        } else {
          // go down
          this.y += 3 * this.jumpVelocity;
          this.jumpVelocity += 0.09;
        }
      } else {
        // restore
        this.y = this.defaultY;
        this.isJumping = false;
        this.jumpingTimer = 0;
        this.jumpVelocity = 4;
        this.isBigJump = false;
        this.arrowUpCounter = 0;
        // footStepSound.play();
      }
    }

    // power up
    // if (this.powerUp) {
    //   if (this.powerUpTimer > this.powerUpLimit) {
    //     this.powerUpTimer = 0;
    //     this.powerUp = false;
    //     this.game.speed = GAME_SPEED.normal;
    //   } else {
    //     this.powerUpTimer += deltaTime;
    //     this.game.speed = GAME_SPEED.normal;
    //   }
    // }
    // handle hit
    if (this.hit) {
      if (this.hitTimer >= this.hitTimeLimit) {
        this.hitTimer = 0;
        this.hit = false;
      } else {
        this.hitTimer += deltaTime;
      }
    }
  }
  draw(context) {
    // debug mode
    if (this.game.debugMode) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    // projectiles
    this.projectiles.forEach((projectile) => projectile.draw(context));

    context.save();
    // handle hit
    context.globalAlpha = this.hit ? 0.5 : 1;

    let imagePositionX = this.x;
    let imagePositionY = this.y;

    if (this.direction === PLAYER_DIRECTION.left) {
      context.translate(this.x + this.width / 2, this.y + this.height / 2);
      context.scale(-1, 1);
      imagePositionX = this.width * -0.5;
      imagePositionY = this.height * -0.5;
    }

    if (this.isJumping) {
      // player is jumping
      context.drawImage(
        this.jumpingImage,
        // currentImage,
        0,
        0,
        337,
        456,
        imagePositionX,
        imagePositionY,
        110 * this.sizeFactor,
        150 * this.sizeFactor
      );
    } else {
      let currentImage;
      currentImage =
        this.moveState === PLAYER_MOVE_STATE.run
          ? this.runningImages[this.frameX]
          : this.idleImages[this.frameX];

      // player is running left
      if (this.direction === PLAYER_DIRECTION.left) {
        context.drawImage(
          // this.runningImages[this.frameX],
          currentImage,
          0,
          0,
          564,
          614,
          imagePositionX,
          imagePositionY,
          this.imageWidth,
          this.imageHeight
        );
      }

      // player is running right
      context.drawImage(
        // this.runningImages[this.frameX],
        currentImage,
        0,
        0,
        564,
        614,
        imagePositionX,
        imagePositionY,
        this.imageWidth,
        this.imageHeight
      );
    }

    // this adds more y to the face making it move up and down with frameX
    let faceYPlus = 0;
    const faceYPlusRunList = [4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3];
    if (this.moveState === PLAYER_MOVE_STATE.run && !this.isJumping) {
      faceYPlus = faceYPlusRunList[this.frameX];
      // TODO: CHANGE TO MAKE HEAD MOVEMENT BIGGER OR SMALLER WHILE RUNNING
      faceYPlus *= 2;
    } else {
      if (this.frameX < this.maxFrameX / 2) {
        faceYPlus = this.frameX;
      } else {
        faceYPlus = this.maxFrameX - this.frameX;
      }
      // TODO: CHANGE TO MAKE HEAD MOVEMENT BIGGER OR SMALLER WHILE WALKING OR JUMPING
      faceYPlus /= 2;
    }

    if (this.moveState === PLAYER_MOVE_STATE.run && !this.isJumping) {
      // TODO: ADJUST x AND y OF FACE WILE RUNNING
      context.drawImage(
        this.faceImage,
        imagePositionX + 35,
        imagePositionY + 15 + faceYPlus,
        this.faceWidth,
        this.faceHeight
      );
    } else if (this.isJumping) {
      context.translate(imagePositionX + 20, imagePositionY + 75 + faceYPlus);
      context.rotate(75);
      // TODO: ADJUST x AND y OF ROTATED FACE
      context.drawImage(
        this.faceImage,
        -25, // x
        -40, // y
        this.faceWidth,
        this.faceHeight
      );
    } else {
      // TODO: ADJUST x AND y OF FACE WILE STANDING/JUMPING
      context.drawImage(
        this.faceImage,
        imagePositionX + 20, // x
        imagePositionY + 25 + faceYPlus, // y
        this.faceWidth,
        this.faceHeight
      );
    }

    context.restore();
  }
}
