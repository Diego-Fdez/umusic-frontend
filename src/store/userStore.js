import { create } from 'zustand';
import Cookies from 'js-cookie';
import { emptyUserState } from '@/models/emptyStateModels';

const getUserFromCookie = (key) =>
  Cookies.get(key) && JSON.parse(Cookies.get(key));
const setUserToCookie = (key, value) => Cookies.set(key, JSON.stringify(value));

const userStore = create((set) => ({
  user: getUserFromCookie('user') || emptyUserState,
  loadingUser: false,
  addUser: (user) => {
    set((state) => {
      setUserToCookie('user', user);
      return { user };
    });
  },
  setLoadingUser: (data) => {
    set((state) => ({
      loadingUser: data,
    }));
  },
}));

export default userStore;
