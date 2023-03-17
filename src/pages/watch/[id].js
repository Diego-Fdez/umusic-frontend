import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import styles from './styles/PlayerScreen.module.css';
import videoStore from '@/store/videoStore';
import { Sidebar } from './components';
import { Navbar, Loader } from '@/components';

const PlayerScreen = () => {
  const { query } = useRouter();
  const { id } = query;
  const videos = videoStore((state) => state.videos);
  const [selectedVideo, setSelectedVideo] = useState({});

  /**
   * Find the video with the id that matches the id passed in as an argument and set that video as the
   * selected video.
   */
  function getSelectedVideo(id) {
    const video = videos.find((video) => video.video?.videoId === id);
    setSelectedVideo(video);
  }

  useEffect(() => {
    getSelectedVideo(id);
  }, [id]);

  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.playListVideoWrapper}>
          <article className={styles.playerContainer}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              width='100%'
              height='100%'
              controls={true}
              loop
            />
          </article>
          <div className={styles.videoInfo}>
            <h4 className={styles.videoInfoTitle}>
              {selectedVideo?.video?.title}
            </h4>
            <div className={styles.infoAuthorContainer}>
              <Image
                src={selectedVideo?.video?.author?.avatar[0]?.url}
                alt={selectedVideo?.video?.author?.title}
                className={styles.infoAuthorAvatar}
              />
              <h6 className={styles.videoInfoSubtitle}>
                {selectedVideo?.video?.author?.title}
              </h6>
            </div>
            <div className={styles.infoStatsContainer}>
              <span>
                {selectedVideo?.video?.stats?.views
                  ? `${Number(
                      selectedVideo?.video?.stats?.views
                    ).toLocaleString('es-US')} views `
                  : '0 views'}
              </span>
              <span>
                {selectedVideo?.video?.publishedTimeText
                  ? ` - ${selectedVideo?.video?.publishedTimeText}`
                  : ''}
              </span>
            </div>
          </div>
        </div>
        <aside>
          <Sidebar videoId={id} />
        </aside>
      </main>
    </Suspense>
  );
};

export default PlayerScreen;
