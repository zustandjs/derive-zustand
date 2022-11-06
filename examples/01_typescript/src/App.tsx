import React from 'react';

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

const App = () => (
  <div>
    <Counter />
  </div>
);

export default App;
