import type { StoreApi } from 'zustand/vanilla';

type Getter<State> = {
  (): State | undefined;
  <T>(store: StoreApi<T>): T;
};

type DeriveFn<State> = (get: Getter<State>) => State;

export function derive<State>(deriveFn: DeriveFn<State>): StoreApi<State> {
  // HACK the first parameter is not the "updated" state yet
  type Listener = (invalidatedState: State, previousState: State) => void;
  type AnyStore = StoreApi<unknown>;
  const listeners = new Set<Listener>();
  const subscriptions = new Map<AnyStore, () => void>();
  let state: State | undefined;
  let invalidated = true;
  const invalidate = () => {
    if (invalidated) {
      return;
    }
    invalidated = true;
    listeners.forEach((listener) => listener(state as State, state as State));
  };
  const getState = (): State => {
    if (!invalidated) {
      return state as State;
    }
    const dependencies = new Set<AnyStore>();
    const get = <T>(store?: StoreApi<T>) => {
      if (!store) {
        return state;
      }
      dependencies.add(store);
      return store.getState();
    };
    state = deriveFn(get as unknown as Getter<State>);
    if (listeners.size) {
      subscriptions.forEach((unsubscribe, store) => {
        if (dependencies.has(store)) {
          dependencies.delete(store);
        } else {
          unsubscribe();
          subscriptions.delete(store);
        }
      });
      dependencies.forEach((store) => {
        subscriptions.set(store, store.subscribe(invalidate));
      });
      invalidated = false;
    }
    return state;
  };
  const subscribe = (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (!listeners.size) {
        subscriptions.forEach((unsubscribe) => unsubscribe());
        subscriptions.clear();
        invalidated = true;
      }
    };
  };
  const store = {
    getState,
    subscribe,
    getInitialState: () => {
      throw new Error('getInitialState is not available in derived store');
    },
    setState: () => {
      throw new Error('setState is not available in derived store');
    },
    destroy: () => {
      throw new Error('destory is not available in derived store');
    },
  };
  return store;
}
