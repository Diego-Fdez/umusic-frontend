import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/TempAuth.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import videoStore from '@/store/videoStore';
import { Loader } from '@/components';

const TempAuth = () => {
  const { query } = useRouter();
  const { id, token } = query;
  const { fetchFromDB, baseURL } = UseFetchFromDB();
  const router = useRouter();
  const loading = videoStore((state) => state.loading);

  /**
   * It takes the id and token from the URL, sends a POST request to the server, and then redirects the
   * user to the home page
   */
  async function getAuth() {
    try {
      await fetchFromDB(
        `${baseURL.auth}/temporary-login?id=
			${id}&token=${token}`,
        'POST'
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.temporaryAuth}>
        <h1>UMUSIC</h1>
        <h2>Making Science...</h2>
        {loading && <Loader />}
      </div>
    </Suspense>
  );
};

export default TempAuth;
