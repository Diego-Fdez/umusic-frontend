import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import styles from "./styles/PlayerScreen.module.css";
import videoStore from "@/store/videoStore";
import Sidebar from "./components/Sidebar/Sidebar";
import { Navbar, Loader, GoogleAnalytics, HeadScreen } from "@/components";
import VideoPlayerInfo from "./components/VideoPlayerInfo/VideoPlayerInfo";

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
        content={`Nuestro reproductor integrado te permite escuchar tus canciones favoritas de forma fácil y 
        conveniente. Con una interfaz intuitiva y fácil de usar, de reproducción, buscar tus canciones favoritas 
        y ajustar la configuración de audio según tus preferencias, lo que significa que puedes escuchar tu música 
        favorita en cualquier momento y en cualquier lugar. Ya sea que estés en casa, en el trabajo o en 
        movimiento, nuestro reproductor integrado te permite disfrutar de la mejor música en cualquier momento. 
        ¡Prueba nuestro reproductor hoy y descubre una nueva forma de disfrutar de la música!`}
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
