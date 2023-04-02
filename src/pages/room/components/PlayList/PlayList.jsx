import { useEffect, useState } from 'react';
import styles from './styles/Playlist.module.css';
import UsePlaying from '@/hooks/usePlaying';
import videoStore from '@/store/videoStore';
import { formattedTime } from '@/utils/formattedTime';
import generateId from '@/utils/generateId';

const PlayList = () => {
  const videosState = videoStore((state) => state.videoList);
  const { playVideo } = UsePlaying();
  const [videos, setVideos] = useState(videosState);

  useEffect(() => {
    setVideos(videosState);
  }, [videosState]);

  return (
    <div className={styles.roomListContainer}>
      <h2 className={styles.roomListTitle}>Video List</h2>
      {videos?.map((video, index) => (
        <div key={generateId()} className={styles.roomListVideo}>
          <div className={styles.roomVideoThumbnail}>
            <button
              className={styles.roomThumbnailButton}
              onClick={() => playVideo(index)}
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
        </div>
      ))}
    </div>
  );
};

export default PlayList;
