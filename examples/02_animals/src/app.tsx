import { create, useStore } from 'zustand';
import { derive } from 'derive-zustand';

type AnimalStore = {
  dogs: number;
  cats: number;
  incDog: () => void;
  incCat: () => void;
};

const useAnimalStore = create<AnimalStore>((set) => ({
  dogs: 0,
  cats: 0,
  incDog: () => set((state) => ({ dogs: state.dogs + 1 })),
  incCat: () => set((state) => ({ cats: state.cats + 1 })),
}));

type TotalsStore = {
  totalAnimals: number;
  totalKinds: number;
};

const totalsStore = derive<TotalsStore>((get) => {
  const animals = get(useAnimalStore);
  return {
    totalAnimals: animals.dogs + animals.cats,
    totalKinds: (animals.dogs > 0 ? 1 : 0) + (animals.cats > 0 ? 1 : 0),
  };
});
const useTotalsStore = <T,>(selector: (state: TotalsStore) => T) =>
  useStore(totalsStore, selector);

const Animals = () => {
  const { dogs, cats, incDog, incCat } = useAnimalStore();
  return (
    <div>
      <div>
        Dogs: {dogs}{' '}
        <button type="button" onClick={incDog}>
          +1
        </button>
      </div>
      <div>
        Cats: {cats}{' '}
        <button type="button" onClick={incCat}>
          +1
        </button>
      </div>
    </div>
  );
};

const Totals = () => {
  const { totalAnimals, totalKinds } = useTotalsStore((state) => state);
  return (
    <div>
      <div>Total animals: {totalAnimals}</div>
      <div>Total kinds: {totalKinds}</div>
    </div>
  );
};

const App = () => (
  <div>
    <Animals />
    <Totals />
  </div>
);

export default App;
