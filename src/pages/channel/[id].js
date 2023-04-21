import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import io from "socket.io-client";
import styles from "./styles/Channel.module.css";
import videoStore from "@/store/videoStore";
import {
  CategoryScreen,
  Loader,
  HeadScreen,
  Navbar,
  VideoCard,
  GoogleAnalytics,
} from "@/components";
import { metaChannelPageContent } from "@/utils/metaContents";
import UseVideos from "@/hooks/useVideos";

let socket;

const Channel = () => {
  const router = useRouter();
  const { id } = router.query;
  const videos = videoStore((state) => state.videos);
  const currentPlaylist = videoStore((state) => state.currentPlaylist);
  const {
    saveVideosState,
    isLoading,
    data,
    getChannelInformation,
    channelLoading,
    channelData,
  } = UseVideos(`v1/channel/videos/?id=${id}&hl=en&gl=US`);

  //adding the videos to the video store
  useEffect(() => {
    saveVideosState();
    getChannelInformation(id);
  }, [data, isLoading, id]);

  //enable connection to the socket server
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER);
    socket.emit("joinRoom", currentPlaylist?._id);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen
        title={channelLoading ? "Loading..." : channelData?.title || "Channel"}
        content={metaChannelPageContent}
      />
      <GoogleAnalytics />
      <Navbar />
      <CategoryScreen />
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.channelContainer}>
          {videos?.length === 0 ? (
            <div className={styles.noChannelVideos}>
              <Image
                src='/men-crying.png'
                alt='men-crying'
                width={300}
                height={300}
                loading='lazy'
              />
              <h3>No videos to show you, please search something</h3>
            </div>
          ) : (
            <>
              {videos?.map((video) => (
                <VideoCard
                  key={video?.video?.videoId}
                  video={video.video}
                  socket={socket}
                />
              ))}
            </>
          )}
        </main>
      )}
    </Suspense>
  );
};

export default Channel;
