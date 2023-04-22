import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const userStore = create(
  persist(
    (set, get) => ({
      userToken: "",
      userInfo: {},
      isAuthenticated: false,
      addUserToken: (token) => {
        set({ userToken: token });
      },
      addUserInfo: (user) => {
        set({ userInfo: user });
      },
      setIsAuthenticated: (data) => {
        set({ isAuthenticated: data });
      },
      getUserToken: () => {
        return get().userToken;
      },
      getUserInfo: () => {
        return get().userInfo;
      },
      getIsAuthenticated: () => {
        return get().isAuthenticated;
      },
      removeUserInfo: () => {
        userStore.persist.clearStorage();
      },
    }),
    {
      name: "umusic-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
