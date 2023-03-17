import { create } from 'zustand';
import Cookies from 'js-cookie';

const userStore = create((set) => ({
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
  loadingUser: false,
  addUser: (data) => {
    set((state) => ({
      user: data,
    }));
    Cookies.set('user', JSON.stringify(data), { expires: 300 });
  },
  setLoadingUser: (data) => {
    set((state) => ({
      loadingUser: data,
    }));
  },
}));

export default userStore;
