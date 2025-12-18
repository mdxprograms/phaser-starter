import Phaser from "phaser";

export type ScaleSize = {
  width: number;
  height: number;
};

export type Positionable = Phaser.GameObjects.Components.Transform;

export function getScaleSize(scene: Phaser.Scene): ScaleSize {
  return { width: scene.scale.width, height: scene.scale.height };
}

/**
 * Centers any object that has Phaser's Transform component
 * (Text, Sprite, Image, Container, Graphics, Shape, etc.)
 */
export function centerOnView(scene: Phaser.Scene, obj: Positionable): void {
  const { width, height } = getScaleSize(scene);
  obj.setPosition(width / 2, height / 2);
}

/**
 * Attach a resize handler, run it once immediately,
 * and auto-clean up on scene shutdown.
 */
export function onResize(
  scene: Phaser.Scene,
  handler: (size: ScaleSize) => void
): void {
  const apply = () => handler(getScaleSize(scene));

  scene.scale.on(Phaser.Scale.Events.RESIZE, apply);
  apply();

  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.scale.off(Phaser.Scale.Events.RESIZE, apply);
  });
}
