import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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

const Channel = () => {
  const router = useRouter();
  const { id } = router.query;
  const videos = videoStore((state) => state.videos);
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
                <VideoCard key={video?.video?.videoId} video={video.video} />
              ))}
            </>
          )}
        </main>
      )}
    </Suspense>
  );
};

export default Channel;
