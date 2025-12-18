import Phaser from "phaser";
import { gameConfig } from "./config";

export function createGame(parentId: string) {
  return new Phaser.Game({
    ...gameConfig,
    parent: parentId,
  });
}
