# Phaser + React + TypeScript Starter

A modern game development starter template combining **Phaser 3** for game logic with **React** for UI overlays, built with TypeScript and Vite for an optimal development experience.

## Features

- 🎮 **Phaser 3** - Modern 2D game engine with WebGL/Canvas rendering
- ⚛️ **React 19** - UI components and HUD overlays  
- 🏗️ **TypeScript** - Full type safety for both game and UI code
- ⚡ **Vite** - Fast dev server with HMR for both React and Phaser
- 🎯 **Responsive Design** - Fixed game resolution (1280x720) with proper scaling
- 🔗 **Type-Safe Events** - EventBus for React ↔ Phaser communication
- 🐛 **Debug Tools** - Built-in debug overlay (press `` ` ``)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

This is a **hybrid application** where:
- **React** handles the app shell, menus, and HUD overlays
- **Phaser** manages the game loop, rendering, physics, and input
- **EventBus** provides type-safe communication between React and Phaser

```
src/
├── App.tsx                 # React/Phaser integration
├── main.tsx               # App entry point
├── game/                  # Phaser game code
│   ├── config.ts          # Phaser configuration
│   ├── constants.ts       # Game constants
│   ├── assets.ts          # Asset loading definitions
│   ├── events.ts          # Type-safe event bus
│   ├── scenes/            # Game scenes
│   ├── entities/          # Game objects (Player, etc.)
│   ├── systems/           # Reusable systems
│   └── utils/             # Helper functions
└── hud/                   # React UI components
    ├── DebugOverlay.tsx   # Debug information
    └── PauseMenu.tsx      # Game menus
```

## Development Guide

### Adding Game Objects

Create entities that wrap Phaser objects:

```typescript
export class Player {
  public readonly sprite: Phaser.GameObjects.Arc;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.circle(x, y, PLAYER.radius, COLORS.player);
  }
  
  moveBy(vx: number, vy: number, dtMs: number) {
    // Movement logic
  }
}
```

### React ↔ Phaser Communication

Use the EventBus for type-safe messaging:

```typescript
// In Phaser scene
eventBus.emit("player:moved", { x: player.x, y: player.y });

// In React component  
eventBus.on("player:moved", ({ x, y }) => {
  setPlayerPosition({ x, y });
});
```

### Adding Assets

1. Place assets in `public/assets/images/`, `public/assets/sprites/`, or `public/assets/audio/`
2. Use dot notation naming: `player.walk.png`, `enemy.basic.png`, `sfx.click.mp3`
3. Add loading calls to `src/game/assets.ts`:

```typescript
export function loadAssets(scene: Phaser.Scene): void {
  scene.load.image("player", "assets/images/player.png");
  scene.load.spritesheet("player.walk", "assets/sprites/player.walk.png", {
    frameWidth: 32, frameHeight: 32
  });
}
```

### Debug Tools

- Press `` ` `` (backtick) to toggle the debug overlay
- Shows FPS, scene info, and player position
- Access Phaser game instance via browser console

## Project Structure

- **Fixed Resolution**: Game renders at 1280x720, scales to fit viewport
- **Scene Flow**: Boot → Preload → Main (with loading progress bar)
- **Constants**: Use `COLORS`, `PLAYER`, `SCENES` objects instead of magic values
- **Mobile Ready**: Viewport meta tags prevent zoom, canvas styling optimized

## Tech Stack

- [Phaser 3.90+](https://phaser.io/) - Game engine
- [React 19](https://react.dev/) - UI framework  
- [TypeScript 5.9+](https://www.typescriptlang.org/) - Type safety
- [Vite 7+](https://vite.dev/) - Build tool and dev server
- [ESLint 9](https://eslint.org/) - Code linting
