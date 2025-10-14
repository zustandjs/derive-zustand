import { derive } from 'derive-zustand';
import { describe, expect, test } from 'vitest';
import { create } from 'zustand';

describe('getInitialState', () => {
  test('should return state, after initialization', () => {
    const store = create(() => ({ count: 1 }));
    const derivedStore = derive<{ double: number }>((get) => {
      const state = get(store);
      return { double: state ? state.count * 2 : 0 };
    });

    const derivedState = derivedStore.getState();
    expect(derivedState.double).toBe(2);

    const initialState = derivedStore.getInitialState();
    expect(initialState.double).toBe(2);
  });

  test('should return initial state, even after state change', () => {
    const store = create(() => ({ count: 1 }));
    const derivedStore = derive<{ double: number }>((get) => {
      const state = get(store);
      return { double: state ? state.count * 2 : 0 };
    });
    store.setState({ count: 2 });
    const derivedState = derivedStore.getState();
    expect(derivedState.double).toBe(4);

    const initialState = derivedStore.getInitialState();
    expect(initialState.double).toBe(2);
  });
});
