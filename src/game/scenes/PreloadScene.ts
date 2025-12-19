import Phaser from "phaser";
import { loadAssets } from "../assets";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.createLoadingUI();
    loadAssets(this);
  }

  create() {
    // Hand off immediately once loading is complete
    this.scene.start("Main");
  }

  /**
   * Loading bar + text
   * Pure UI. No asset logic.
   */
  private createLoadingUI() {
    const { width, height } = this.scale;

    const barWidth = Math.min(600, width * 0.7);
    const barHeight = 14;

    const box = this.add
      .rectangle(width / 2, height / 2, barWidth, barHeight, 0x1e2a44)
      .setOrigin(0.5);

    const fill = this.add
      .rectangle(width / 2 - barWidth / 2, height / 2, 0, barHeight, 0x6aa9ff)
      .setOrigin(0, 0.5);

    const loadingText = this.add
      .text(width / 2, height / 2 - 24, "Loading...", {
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
        color: "#a9b7d6",
      })
      .setOrigin(0.5);

    this.load.on("progress", (value: number) => {
      fill.width = barWidth * value;
    });

    this.load.once("complete", () => {
      box.destroy();
      fill.destroy();
      loadingText.destroy();
    });
  }
}
