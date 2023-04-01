import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../../styles/TempAuth.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import { Loader } from '@/components';
import tempUserStore from '@/store/tempUserStore';
import persistedVideoStore from '@/store/persistedVideoStore';

const TempAuth = () => {
  const { query } = useRouter();
  const { id, room, token } = query;
  const { fetchFromDB, error, loading } = UseFetchFromDB();
  const router = useRouter();
  const addTempUserInfo = tempUserStore((state) => state.addTempUserInfo);
  const addTempUserToken = tempUserStore((state) => state.addTempUserToken);
  const setTempUserIsAuth = tempUserStore((state) => state.setTempUserIsAuth);
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );
  const [isTempLoginComplete, setIsTempLoginComplete] = useState(false);

  /**
   * It takes the id and token from the URL, sends a POST request to the server, and then redirects the
   * user to the home page
   */
  async function handleTempLogin() {
    const setData = {
      id,
      name: 'Diego',
      room: room,
    };
    const result = await fetchFromDB(
      `/api/v1/tempauth`,
      'POST',
      setData,
      token
    );

    if (error) return toast.error(error);
    console.log(result);
    addTempUserInfo(result?.data?.userInfo);
    addTempUserToken(result?.data?.userToken);
    setTempUserIsAuth(true);
    setCurrentPlaylist({ _id: result?.data?.userInfo?.roomId });
    toast.success('Successfully logged in!');
    setIsTempLoginComplete(true);
  }

  async function navigateToHome() {
    if (isTempLoginComplete) {
      await router.replace('/');
    }
  }

  useEffect(() => {
    if (id && token) handleTempLogin();
  }, [id, token]);

  useEffect(() => {
    navigateToHome();
  }, [isTempLoginComplete]);

  return (
    <>
      <div className={styles.temporaryAuth}>
        <h1>UMUSIC</h1>
        <h2>Making Science...</h2>
        {loading && <Loader />}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </div>
    </>
  );
};

export default TempAuth;
