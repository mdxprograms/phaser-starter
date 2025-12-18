import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  init() {
    // Prevent right-click menu on the canvas
    this.input.mouse?.disableContextMenu();

    // Make sure the game keeps running when tab focus changes (optional)
    this.game.events.once(Phaser.Core.Events.BLUR, () => {
      this.sound.pauseAll();
    });

    this.game.events.once(Phaser.Core.Events.FOCUS, () => {
      this.sound.resumeAll();
    });
  }

  create() {
    // Boot should do almost nothing, then get out of the way
    this.scene.start("Preload");
  }
}
