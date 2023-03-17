import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
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
  }, [getVideoList, id]);

  return (
    <Suspense fallback={<Loader />}>
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
