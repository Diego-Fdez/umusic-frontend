import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/TempAuth.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import videoStore from '@/store/videoStore';
import { Loader } from '@/components';
import userStore from '@/store/userStore';

const TempAuth = () => {
  const { query } = useRouter();
  const { id, token } = query;
  const { fetchFromDB } = UseFetchFromDB();
  const router = useRouter();
  const loading = videoStore((state) => state.loading);
  const addUser = userStore((state) => state.addUser);

  /**
   * It takes the id and token from the URL, sends a POST request to the server, and then redirects the
   * user to the home page
   */
  async function handleTempLogin() {
    try {
      const result = await fetchFromDB(
        `/api/v1/tempauth/${id}/${token}`,
        'POST'
      );
      addUser(result?.data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id && token) handleTempLogin();
  }, [id, token]);

  return (
    <>
      <div className={styles.temporaryAuth}>
        <h1>UMUSIC</h1>
        <h2>Making Science...</h2>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default TempAuth;
