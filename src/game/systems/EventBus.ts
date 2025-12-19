type Handler<T> = (payload: T) => void;

export class EventBus<Events extends Record<string, unknown>> {
  private listeners: {
    [K in keyof Events]?: Set<Handler<Events[K]>>;
  } = {};

  on<K extends keyof Events>(
    event: K,
    handler: Handler<Events[K]>
  ): () => void {
    const set = this.listeners[event] ?? new Set<Handler<Events[K]>>();
    set.add(handler);
    this.listeners[event] = set;

    return () => this.off(event, handler);
  }

  off<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void {
    const set = this.listeners[event];
    if (!set) return;

    set.delete(handler);
    if (set.size === 0) {
      delete this.listeners[event];
    }
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const set = this.listeners[event];
    if (!set) return;

    // Copy to allow safe unsubscribe during emit
    [...set].forEach((handler) => handler(payload));
  }

  clear<K extends keyof Events>(event?: K): void {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
  }
}
