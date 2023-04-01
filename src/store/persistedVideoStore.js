import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const persistedVideoStore = create(
  persist(
    (set, get) => ({
      categoriesState: [],
      currentPlaylist: {},
      addCategories: (categories) => {
        set({ categoriesState: categories });
      },
      setCurrentPlaylist: (data) => {
        set({ currentPlaylist: data });
      },
      getCategories: () => {
        return get().categoriesState;
      },
      getCurrentPlaylist: () => {
        return get().currentPlaylist;
      },
    }),
    {
      name: 'umusic-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default persistedVideoStore;
