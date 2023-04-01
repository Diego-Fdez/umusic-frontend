import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const tempUserStore = create(
  persist(
    (set, get) => ({
      tempUserToken: '',
      tempUserInfo: {},
      tempUserIsAuth: false,
      addTempUserToken: (token) => {
        set({ tempUserToken: token });
      },
      addTempUserInfo: (user) => {
        set({ tempUserInfo: user });
      },
      setTempUserIsAuth: (data) => {
        set({ tempUserIsAuth: data });
      },
      getTempUserToken: () => {
        return get().tempUserToken;
      },
      getTempUserInfo: () => {
        return get().tempUserInfo;
      },
      getTempUserIsAuth: () => {
        return get().tempUserIsAuth;
      },
    }),
    {
      name: 'umusic-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default tempUserStore;
