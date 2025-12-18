import { EventBus } from "./systems/EventBus";

export type GameEvents = {
  "scene:ready": { sceneKey: string };
  "player:moved": { x: number; y: number };
  "perf:fps": { fps: number };
  "ui:pause": undefined;
};


export const eventBus = new EventBus<GameEvents>();
