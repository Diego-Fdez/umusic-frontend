import { create } from 'zustand';
import Cookies from 'js-cookie';
import { emptyUserState } from '@/models/emptyStateModels';

const userStore = create((set) => ({
  user: emptyUserState,
  loadingUser: false,
  addUser: (data) => {
    set((state) => ({
      user: data,
    }));
  },
  setLoadingUser: (data) => {
    set((state) => ({
      loadingUser: data,
    }));
  },
}));

export default userStore;
