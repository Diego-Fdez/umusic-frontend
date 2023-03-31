import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const persistedVideoStore = create(
  persist(
    (set, get) => ({
      categoriesState: [],
      addCategories: (categories) => {
        set({ categoriesState: categories });
      },
      getCategories: () => {
        return get().categoriesState;
      },
    }),
    {
      name: 'umusic-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default persistedVideoStore;
