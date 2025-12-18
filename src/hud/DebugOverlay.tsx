import { useEffect, useMemo, useState } from "react";
import { eventBus } from "../game/events";

type DebugState = {
  sceneKey: string;
  fps: number;
  playerX?: number;
  playerY?: number;
};

export default function DebugOverlay() {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<DebugState>({
    sceneKey: "unknown",
    fps: 0,
  });

  // Simple keyboard toggle: press `
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") setOpen(v => !v);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Subscribe to game events
  useEffect(() => {
    const offScene = eventBus.on("scene:ready", payload => {
      setState(s => ({ ...s, sceneKey: payload.sceneKey }));
    });

    const offMoved = eventBus.on("player:moved", payload => {
      setState(s => ({ ...s, playerX: payload.x, playerY: payload.y }));
    });

    // If you emit fps from Phaser, you can listen here too
    const offFps = eventBus.on("perf:fps", payload => {
      setState(s => ({ ...s, fps: payload.fps }));
    });

    return () => {
      offScene();
      offMoved();
      offFps();
    };
  }, []);

  const panelStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "fixed",
      top: 12,
      left: 12,
      zIndex: 9999,
      padding: "10px 12px",
      borderRadius: 10,
      background: "rgba(10, 14, 24, 0.82)",
      color: "#e6eeff",
      fontFamily: "system-ui, sans-serif",
      fontSize: 12,
      lineHeight: 1.35,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
      pointerEvents: "auto",
      userSelect: "text",
      minWidth: 220,
    }),
    []
  );

  const wrapperStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      pointerEvents: "none", // clicks go to the game except the panel
    }),
    []
  );

  if (!open) return null;

  const px = state.playerX == null ? "?" : Math.round(state.playerX);
  const py = state.playerY == null ? "?" : Math.round(state.playerY);

  return (
    <div style={wrapperStyle}>
      <div style={panelStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <strong>Debug</strong>
          <span style={{ opacity: 0.75 }} title="Press ` to toggle">
            `
          </span>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "8px 0" }} />

        <div><span style={{ opacity: 0.75 }}>Scene:</span> {state.sceneKey}</div>
        <div><span style={{ opacity: 0.75 }}>FPS:</span> {state.fps.toFixed(0)}</div>
        <div><span style={{ opacity: 0.75 }}>Player:</span> {px}, {py}</div>

        <div style={{ marginTop: 8, opacity: 0.75 }}>
          Tip: emit <code>perf:fps</code> and <code>player:moved</code> from Phaser.
        </div>
      </div>
    </div>
  );
}
