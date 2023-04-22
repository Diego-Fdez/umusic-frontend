import styles from "./styles/Playlist.module.css";
import UsePlaying from "@/hooks/usePlaying";
import videoStore from "@/store/videoStore";
import { formattedTime } from "@/utils/formattedTime";
import generateId from "@/utils/generateId";
import { Loader } from "@/components";
import UsePlaylist from "@/hooks/usePlaylist";

const PlayList = () => {
  const videos = videoStore((state) => state.videoList);
  const { playVideo } = UsePlaying();
  const { handlerDeleteVideo, handlerDeleteAllVideos, loading } = UsePlaylist();

  return (
    <div className={styles.roomListContainer}>
      <h2 className={styles.roomListTitle}>Video List</h2>
      <button
        className={styles.clearAllVideosButton}
        onClick={() => handlerDeleteAllVideos(videos[0]?._id)}
        title='Clear all videos'
      >
        <small>Clear all videos</small>
        <img src='/clean-icon.svg' alt='clear-icon' />
      </button>
      <>
        {videos?.map((video, index) => (
          <div key={generateId()} className={styles.roomListVideo}>
            <div className={styles.roomVideoThumbnail}>
              <button
                className={styles.roomThumbnailButton}
                onClick={() => playVideo(index)}
                title='Play'
              >
                <img
                  src={video?.videos?.video_pic_url}
                  alt={video?.videos?.video_title}
                  className={styles.roomThumbnailImg}
                />
              </button>
              <div className={styles.videoListDurationContainer}>
                <p>{formattedTime(video?.videos?.video_length)}</p>
              </div>
            </div>
            <div className={styles.roomVideoInfoContainer}>
              <h4 className={styles.roomVideoListTitle}>
                {video?.videos?.video_title.slice(0, 40)}
              </h4>
              <h6 className={styles.roomListAuthorTitle}>
                {video?.videos?.channels?.channel_title.slice(0, 30)}
              </h6>
            </div>
            <button
              onClick={() => handlerDeleteVideo(video?.videos?.video_id)}
              title='Delete'
            >
              <img src='/delete-song-icon.svg' alt='delete-song-icon' />
            </button>
          </div>
        ))}
      </>
      {loading && <Loader />}
    </div>
  );
};

export default PlayList;
