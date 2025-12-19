import { useEffect, useRef } from "react";
import { createGame } from "./game/createGame";
import DebugOverlay from "./hud/DebugOverlay";

export default function App() {
  const gameRef = useRef<ReturnType<typeof createGame> | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = createGame("phaser-root");
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div style={{ height: "100vh", background: "#0b0f1a" }}>
      <div id="phaser-root" />
      <DebugOverlay />
    </div>
  );
}
