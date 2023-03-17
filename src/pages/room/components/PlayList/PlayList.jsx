import Image from 'next/image';
import styles from './styles/Playlist.module.css';
import UsePlaying from '@/hooks/usePlaying';
import videoStore from '@/store/videoStore';
import { formattedTime } from '@/utils/formattedTime';

const PlayList = () => {
  const videos = videoStore((state) => state.videoList);
  const { playVideo } = UsePlaying();

  return (
    <div className={styles.roomListContainer}>
      <h2 className={styles.roomListTitle}>Video List</h2>
      {videos?.map((video, index) => (
        <div key={video?.video_id} className={styles.roomListVideo}>
          <div className={styles.roomVideoThumbnail}>
            <button
              className={styles.roomThumbnailButton}
              onClick={() => playVideo(index)}
            >
              <Image
                src={video?.video_pic_url}
                alt={video?.video_title}
                width={160}
                height='100%'
                className={styles.roomThumbnailImg}
              />
            </button>
            <div className={styles.videoListDurationContainer}>
              <p>{formattedTime(video?.video_length)}</p>
            </div>
          </div>
          <div className={styles.roomVideoInfoContainer}>
            <h4 className={styles.roomVideoListTitle}>
              {video?.video_title.slice(0, 40)}
            </h4>
            <h6 className={styles.roomListAuthorTitle}>
              {video?.channel_title.slice(0, 30)}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayList;
