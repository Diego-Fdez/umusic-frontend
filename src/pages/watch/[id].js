import { Suspense, useEffect, lazy } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import styles from './styles/PlayerScreen.module.css';
import { Loader, HeadScreen } from '@/components';
import { metaWatchPageContent } from '@/utils/metaContents';
import UsePlaying from '@/hooks/usePlaying';
const Navbar = lazy(() => import('../../components/Navbar/Navbar'));
const VideoPlayerInfo = lazy(() =>
  import('./components/VideoPlayerInfo/VideoPlayerInfo')
);
const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'));

const PlayerScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  const { handlerNextVideo, getSelectedVideo, selectedVideo } = UsePlaying();

  useEffect(() => {
    getSelectedVideo(id);
  }, [id]);

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen
        title={selectedVideo?.video?.title}
        content={metaWatchPageContent}
      />
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.playListVideoWrapper}>
          <article className={styles.playerContainer}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${selectedVideo?.video?.videoId}`}
              width='100%'
              height='100%'
              controls={true}
              playing={true}
              onEnded={handlerNextVideo}
            />
            <button onClick={() => handlerNextVideo()}>
              <img src='/next-icon.svg' alt='next-icon' />
            </button>
          </article>
          <VideoPlayerInfo selectedVideo={selectedVideo} />
        </div>
        <aside>
          <Sidebar videoId={id} />
        </aside>
      </main>
    </Suspense>
  );
};

export default PlayerScreen;
