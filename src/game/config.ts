import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { PreloadScene } from "./scenes/PreloadScene";
import { MainScene } from "./scenes/MainScene";

/**
 * Base resolution the game is authored at
 * (DO NOT change per device)
 */
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

/**
 * Environment flags
 */
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

/**
 * Phaser GameConfig
 * This file should stay boring on purpose
 */
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  backgroundColor: "#0b0f1a",

  // Rendering
  antialias: true,
  pixelArt: false,
  roundPixels: false,

  // Timing
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },

  // Scaling & centering
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },

  // Physics (defaults only)
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: IS_DEV,
    },
  },

  // Input
  input: {
    mouse: true,
    touch: true,
    gamepad: false,
  },

  // Scenes (order matters)
  scene: [
    BootScene,
    PreloadScene,
    MainScene,
  ],
};
