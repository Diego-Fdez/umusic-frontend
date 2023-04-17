import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import styles from "./styles/PlayerScreen.module.css";
import videoStore from "@/store/videoStore";
import Sidebar from "./components/Sidebar/Sidebar";
import { Navbar, Loader, GoogleAnalytics, HeadScreen } from "@/components";
import VideoPlayerInfo from "./components/VideoPlayerInfo/VideoPlayerInfo";
import { metaWatchPageContent } from "@/utils/metaContents";

const PlayerScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  const videos = videoStore((state) => state.videos);
  const [selectedVideo, setSelectedVideo] = useState({});

  function handlerNextVideo() {
    router.push(`/watch/${videos[0]?.video?.videoId}`);
  }

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
      <HeadScreen
        title={selectedVideo?.video?.title}
        content={metaWatchPageContent}
      />
      <GoogleAnalytics />
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
