import { create } from 'zustand';
import Cookies from 'js-cookie';
import { emptyUserState } from '@/models/emptyStateModels';

const getCookieToken = Cookies.get('userToken') ? Cookies.get('userToken') : '';
const setCookieToken = (data) => {
  Cookies.set('userToken', data);
};
// const getCookieUser = Cookies.get('user') ? Cookies.get('user') : '';
// const setCookieUser = (data) => {
//   Cookies.set('user', data);
// };

const userStore = create((set) => ({
  userToken: getCookieToken,
  // user: getCookieUser,
  addUserToken: (data) => {
    set((state) => {
      data && setCookieToken(data);
    });
  },
  // addUser: (data) => {
  //   set((state) => {
  //     data && setCookieUser(data);
  //   });
  // },
}));

export default userStore;
