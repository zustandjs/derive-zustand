# derive-zustand

[![CI](https://img.shields.io/github/workflow/status/dai-shi/derive-zustand/CI)](https://github.com/dai-shi/derive-zustand/actions?query=workflow%3ACI)
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
import { createStore, useStore } from 'zustand';
import { derive } from 'derive-zustand';

const countStore = createStore(() => 0);
const doubleCountStore = derive<number>((get) => get(countStore) * 2);

const Counter = () => {
  const count = useStore(countStore);
  const doubleCount = useStore(doubleCountStore);
  const inc = () => countStore.setState((c) => c + 1);
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
PORT=8080 yarn run examples:01_typescript
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/derive-zustand/tree/main/examples/01_typescript)
