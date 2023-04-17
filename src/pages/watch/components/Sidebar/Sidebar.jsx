import { useEffect } from "react";
import Link from "next/link";
import useSWRImmutable from "swr/immutable";
import styles from "./styles/Sidebar.module.css";
import { Loader } from "@/components";
import videoStore from "@/store/videoStore";
import { formattedTime } from "@/utils/formattedTime";
import { filterEmptyVideos } from "@/utils/handlerFilterVideos";
import { baseURL, options } from "@/utils/youtubeConfig";

const fetcher = (url) => fetch(url, options).then((res) => res.json());

const Sidebar = ({ videoId }) => {
  const videos = videoStore((state) => state.videos);
  const addVideos = videoStore((state) => state.addVideos);

  //fetching the videos from the API with swr
  const { data, isLoading } = useSWRImmutable(
    `${baseURL}/v1/video/related-contents/?id=${videoId}&hl=es&gl=CR`,
    fetcher
  );

  //setting the videos to the videoStore
  useEffect(() => {
    if (!isLoading) {
      const filteredVideos = filterEmptyVideos(data?.contents);
      addVideos(filteredVideos);
    }
  }, [data]);

  return (
    <div className={styles.playlistDetailContainer}>
      <h2 className={styles.playlistDetailTitle}>Related Videos</h2>
      {isLoading && <Loader />}
      {videos?.map((video) => (
        <div key={video?.video?.videoId} className={styles.playlistDetailVideo}>
          <div className={styles.playlistDetailVideoThumbnail}>
            <Link href={`/watch/${video?.video?.videoId}`}>
              <img
                src={video?.video?.thumbnails[0]?.url}
                alt={video?.video?.title}
                className={styles.videoThumbnailImg}
              />
            </Link>
            <div className={styles.playListDetailDurationContainer}>
              <p>{formattedTime(video?.video?.lengthSeconds)}</p>
            </div>
          </div>
          <div className={styles.playlistDetailInfoContainer}>
            <Link href={`/watch/${video?.video?.videoId}`}>
              <h4 className={styles.playlistDetailVideoTitle}>
                {video?.video?.title.slice(0, 60)}
              </h4>
            </Link>
            <Link href={`/channel/${video?.video?.author?.channelId}`}>
              <h6 className={styles.playlistDetailAuthorTitle}>
                {video?.video?.author?.title}
              </h6>
            </Link>
            <div className={styles.playlistDetailStatsContainer}>
              <span>
                {video?.video?.stats?.views
                  ? `${Number(video?.video?.stats?.views).toLocaleString(
                      "es-US"
                    )} views `
                  : "0 views"}
              </span>
              <span>
                {video?.video?.publishedTimeText
                  ? ` - ${video?.video?.publishedTimeText}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
