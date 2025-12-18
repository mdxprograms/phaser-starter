import Phaser from "phaser";
import { PLAYER, COLORS } from "../constants";

export class Player {
  private scene: Phaser.Scene;
  public readonly sprite: Phaser.GameObjects.Arc;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.sprite = scene.add.circle(x, y, PLAYER.radius, COLORS.player);
  }

  moveBy(vx: number, vy: number, dtMs: number) {
    const d = dtMs / 1000;
    this.sprite.x += vx * PLAYER.speed * d;
    this.sprite.y += vy * PLAYER.speed * d;
  }

  clampToView() {
    const r = this.sprite.radius;
    const w = this.scene.scale.width;
    const h = this.scene.scale.height;

    this.sprite.x = Phaser.Math.Clamp(this.sprite.x, r, w - r);
    this.sprite.y = Phaser.Math.Clamp(this.sprite.y, r, h - r);
  }

  setPosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }
}
