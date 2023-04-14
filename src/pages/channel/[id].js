import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import io from "socket.io-client";
import useSWR from "swr";
import styles from "./styles/Channel.module.css";
import { baseURL, options } from "@/utils/youtubeConfig";
import videoStore from "@/store/videoStore";
import {
  CategoryScreen,
  Loader,
  HeadScreen,
  Navbar,
  VideoCard,
  GoogleAnalytics,
} from "@/components";
import { filterEmptyVideos } from "@/utils/handlerFilterVideos";

let socket;

const fetcher = (url) => fetch(url, options).then((res) => res.json());

const Channel = () => {
  const router = useRouter();
  const { id } = router.query;
  const videos = videoStore((state) => state.videos);
  const addVideos = videoStore((state) => state.addVideos);
  const currentPlaylist = videoStore((state) => state.currentPlaylist);

  //fetching the videos from the API with swr
  const { data, error, isLoading } = useSWR(
    `${baseURL}/v1/channel/videos/?id=${id}&hl=en&gl=US`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  //fetching the channel details from the API with swr
  const { data: channelData, isLoading: channelLoading } = useSWR(
    `${baseURL}/v1/channel/details/?id=${id}&hl=en&gl=US`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  //adding the videos to the video store
  useEffect(() => {
    if (!isLoading) {
      const filteredVideos = filterEmptyVideos(data?.contents);
      addVideos(filteredVideos);
    }
  }, [data, isLoading]);

  //enable connection to the socket server
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER);
    socket.emit("joinRoom", currentPlaylist?._id);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen
        title={channelLoading ? "Loading..." : channelData?.title || "Channel"}
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
