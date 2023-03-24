import { create } from 'zustand';
import Cookies from 'js-cookie';
import { emptyUserState } from '@/models/emptyStateModels';

const userStore = create((set) => ({
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : emptyUserState,
  loadingUser: false,
  addUser: (data) => {
    set((state) => ({
      user: data,
    }));
    Cookies.set('user', JSON.stringify(user));
  },
  setLoadingUser: (data) => {
    set((state) => ({
      loadingUser: data,
    }));
  },
}));

export default userStore;
