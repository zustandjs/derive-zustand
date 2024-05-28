# derive-zustand

[![CI](https://img.shields.io/github/actions/workflow/status/dai-shi/derive-zustand/ci.yml?branch=main)](https://github.com/dai-shi/derive-zustand/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/derive-zustand)](https://www.npmjs.com/package/derive-zustand)
[![size](https://img.shields.io/bundlephobia/minzip/derive-zustand)](https://bundlephobia.com/result?p=derive-zustand)
[![discord](https://img.shields.io/discord/627656437971288081)](https://discord.gg/MrQdmzd)

A function to create a derived [Zustand](https://github.com/pmndrs/zustand) store from stores

## Install

```bash
npm install zustand derive-zustand
```

## Usage

```tsx
import create, { useStore } from 'zustand';
import { derive } from 'derive-zustand';

const useCountStore = create<{ count: number; inc: () => void }>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

const doubleCountStore = derive<number>((get) => get(useCountStore).count * 2);
const useDoubleCountStore = () => useStore(doubleCountStore);

const Counter = () => {
  const { count, inc } = useCountStore();
  const doubleCount = useDoubleCountStore();
  return (
    <div>
      <div>count: {count}</div>
      <div>doubleCount: {doubleCount}</div>
      <button type="button" onClick={inc}>
        +1
      </button>
    </div>
  );
};
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 pnpm run examples:01_counter
```

and open <http://localhost:8080> in your web browser.

You can also try them directly:
[01](https://stackblitz.com/github/dai-shi/derive-zustand/tree/main/examples/01_counter)
[02](https://stackblitz.com/github/dai-shi/derive-zustand/tree/main/examples/02_animals)
