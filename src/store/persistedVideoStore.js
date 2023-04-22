import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const persistedVideoStore = create(
  persist(
    (set, get) => ({
      currentPlaylist: {},
      setCurrentPlaylist: (data) => {
        set({ currentPlaylist: data });
      },
      getCurrentPlaylist: () => {
        return get().currentPlaylist;
      },
      removeCurrentPlaylist: () => {
        persistedVideoStore.persist.clearStorage();
      },
    }),
    {
      name: "umusic-playlist",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default persistedVideoStore;
