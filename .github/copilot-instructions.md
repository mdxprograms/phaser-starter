# Phaser + React + TypeScript Starter Instructions

## Architecture Overview

This is a **hybrid React/Phaser application** where:
- **React** manages the outer app shell, HUD overlays, and menus ([App.tsx](src/App.tsx), [src/hud/](src/hud/))
- **Phaser** handles the core game loop, rendering, and input ([src/game/](src/game/))
- **EventBus** bridges communication between React and Phaser ([src/game/events.ts](src/game/events.ts))

Key integration: React renders the Phaser game in a `div#phaser-root` and overlays React components for UI.

## Project Structure Patterns

- **Game Entry**: [createGame.ts](src/game/createGame.ts) initializes Phaser with [config.ts](src/game/config.ts)
- **Scenes**: Follow Phaser lifecycle in [src/game/scenes/](src/game/scenes/) - Boot → Preload → Main
- **Entities**: Game objects like [Player.ts](src/game/entities/Player.ts) wrap Phaser sprites with business logic
- **Systems**: Reusable game systems like [EventBus.ts](src/game/systems/EventBus.ts) for type-safe events
- **Constants**: Game values in [constants.ts](src/game/constants.ts) - use `COLORS`, `PLAYER`, `SCENES` objects
- **Utils**: Helper functions like [scale.ts](src/game/utils/scale.ts) for responsive positioning

## Development Workflow

**Start dev server**: `npm run dev` (Vite handles HMR for both React and Phaser)
**Build**: `npm run build` (TypeScript compilation + Vite bundle)
**Preview**: `npm run preview` (test production build)

**Debug Tools**:
- Press `` ` `` (backtick) to toggle debug overlay showing FPS, player position, scene info
- React DevTools for UI components
- Phaser objects accessible via `window.game` in [DebugOverlay.tsx](src/hud/DebugOverlay.tsx)

## Key Conventions

**Game Lifecycle**: Always use the EventBus for React ↔ Phaser communication. Example:
```typescript
// In Phaser scene
eventBus.emit("player:moved", { x: player.x, y: player.y });
// In React component  
eventBus.on("player:moved", ({ x, y }) => setPlayerPos({ x, y }));
```

**Scaling**: Game uses fixed 1280x720 resolution with `Phaser.Scale.FIT` mode. Use [scale.ts](src/game/utils/scale.ts) utilities for responsive positioning.

**Entity Pattern**: Entities like `Player` should wrap Phaser objects and expose clean APIs:
```typescript
export class Player {
  public readonly sprite: Phaser.GameObjects.Arc;
  moveBy(vx: number, vy: number, dtMs: number) { /* physics */ }
  clampToView() { /* boundary logic */ }
}
```

**Scene Management**: Scenes transition via `this.scene.start("SceneName")`. Use `SCENES` constants, not magic strings.

## Critical Files

- [App.tsx](src/App.tsx) - React/Phaser integration point, manages game lifecycle
- [config.ts](src/game/config.ts) - Core Phaser configuration, scaling, physics
- [events.ts](src/game/events.ts) - Type-safe event definitions for React/Phaser bridge
- [constants.ts](src/game/constants.ts) - Game constants (colors, speeds, scene names)
- [MainScene.ts](src/game/scenes/MainScene.ts) - Primary gameplay scene template

## Mobile Considerations

- Viewport meta prevents zoom/scaling in [index.html](index.html)
- Touch controls would extend the input system in MainScene
- Canvas styling prevents context menus and ensures proper rendering

## Asset Management

**Directory Structure**:
```
public/assets/
  images/     # Static images, UI elements
  sprites/    # Spritesheets, animated assets  
  audio/      # Sound effects, music
```

**Naming Convention**: Use dot notation for related assets:
- `player`, `player.walk`, `player.jump` 
- `enemy.basic`, `ui.button`, `ui.panel`
- `sfx.click`, `music.main`

**Loading Pattern**: 
- All asset definitions go in [assets.ts](src/game/assets.ts) `loadAssets()` function
- [PreloadScene.ts](src/game/scenes/PreloadScene.ts) calls `loadAssets(this)` in `preload()`
- Uses centralized loading with progress bar UI
- Assets available in all subsequent scenes