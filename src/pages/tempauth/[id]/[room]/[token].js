import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styles from '../../styles/TempAuth.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import { Loader, GoogleAnalytics, HeadScreen } from '@/components';
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

    /* Checking if there is an error, and if there is, it will display a toast error. */
    if (error) return toast.error(error);

    /* Setting the state of the tempUserStore and persistedVideoStore. */
    addTempUserInfo(result?.data?.userInfo);
    addTempUserToken(result?.data?.userToken);
    setTempUserIsAuth(true);
    setCurrentPlaylist({ _id: result?.data?.userInfo?.roomId });
    toast.success('Successfully logged in!');
    setIsTempLoginComplete(true);
  }

  //If the user has completed the temporary login process, then navigate to the home page
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
      <HeadScreen
        title={'Temporary Authentication'}
        content={`Bienvenido a nuestra página temporal de inicio de sesión para nuestra aplicación de videos 
        musicales. Tenga en cuenta que esta página temporal de inicio de sesión es solo para propósitos de compartir
        con amigos. Si desea realizar una cuenta, por favor, vaya al apartado de login.`}
      />
      <GoogleAnalytics />
      <div className={styles.temporaryAuth}>
        <h1>UMUSIC</h1>
        <h2>Making Science...</h2>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default TempAuth;
