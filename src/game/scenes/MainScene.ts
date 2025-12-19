import Phaser from "phaser";
import { Player } from "../entities/Player";
import { COLORS } from "../constants";
import { eventBus } from "../events";

export class MainScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Player;

  constructor() {
    super("Main");
  }

  create() {
    this.cursors = this.input.keyboard!.createCursorKeys();

    const { width, height } = this.scale;

    this.add.text(24, 20, "MainScene", {
      fontFamily: "system-ui, sans-serif",
      fontSize: "18px",
      color: COLORS.textPrimary,
    });

    this.add.text(24, 46, "Arrow keys move the dot. (Dots ship games.)", {
      fontFamily: "system-ui, sans-serif",
      fontSize: "14px",
      color: COLORS.textMuted,
    });

    this.player = new Player(this, width / 2, height / 2);

    // Optional: recenter on resize for now (you can remove later)
    this.scale.on(Phaser.Scale.Events.RESIZE, () => {
      this.player.setPosition(this.scale.width / 2, this.scale.height / 2);
    });

    eventBus.emit("scene:ready", { sceneKey: this.scene.key });
  }

  update(_: number, dt: number) {
    let vx = 0;
    let vy = 0;

    if (this.cursors.left?.isDown) vx -= 1;
    if (this.cursors.right?.isDown) vx += 1;
    if (this.cursors.up?.isDown) vy -= 1;
    if (this.cursors.down?.isDown) vy += 1;

    // Normalize diagonal
    if (vx !== 0 && vy !== 0) {
      const inv = 1 / Math.sqrt(2);
      vx *= inv;
      vy *= inv;
    }

    this.player.moveBy(vx, vy, dt);
    this.player.clampToView();
  }
}
