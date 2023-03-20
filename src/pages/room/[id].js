import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './styles/RoomScreen.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import videoStore from '@/store/videoStore';
import { Loader, Navbar } from '@/components';
import { PlayList, VideoHeaders, VideoScreen } from './components';

const RoomScreen = () => {
  const { query } = useRouter();
  const { id } = query;
  const { getVideoList } = UseFetchFromDB();
  const loading = videoStore((state) => state.loading);

  useEffect(() => {
    getVideoList(id);
  }, [id]);

  return (
    <Suspense fallback={<Loader />}>
      <Head>
        <title>Playlist - UMUSIC</title>
        <meta
          name='description'
          content='¿Quieres crear tu propia lista de reproducción personalizada? ¡No hay problema! Nuestra app te permite crear y compartir tus propias listas de reproducción, o colaborar con amigos para crear listas de reproducción compartidas. ¡Explora nuestras listas de reproducción hoy y descubre la mejor música para cada momento!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta charset='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {loading && <Loader />}
      <Navbar />
      <main className={styles.roomContainer}>
        <article className={styles.playerVideoContainer}>
          <VideoScreen />
          <VideoHeaders />
        </article>
        <aside>
          <PlayList />
        </aside>
      </main>
    </Suspense>
  );
};

export default RoomScreen;
