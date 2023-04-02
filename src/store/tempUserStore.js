import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const tempUserStore = create(
  persist(
    (set, get) => ({
      tempUserToken: '',
      tempUserInfo: {},
      tempUserIsAuth: false,
      addTempUserToken: (userToken) => {
        set({ tempUserToken: userToken });
      },
      addTempUserInfo: (tempUser) => {
        set({ tempUserInfo: tempUser });
      },
      setTempUserIsAuth: (isAuth) => {
        set({ tempUserIsAuth: isAuth });
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
      name: 'temp-user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default tempUserStore;
