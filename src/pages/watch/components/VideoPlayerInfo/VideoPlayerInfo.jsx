import Image from 'next/image';
import styles from './styles/VideoPlayerInfo.module.css';

const VideoPlayerInfo = ({ selectedVideo }) => {
  return (
    <div className={styles.videoInfo}>
      <h4 className={styles.videoInfoTitle}>{selectedVideo?.video?.title}</h4>
      <div className={styles.infoAuthorContainer}>
        <Image
          src={selectedVideo?.video?.author?.avatar[0]?.url}
          alt={selectedVideo?.video?.author?.title}
          className={styles.infoAuthorAvatar}
          width={32}
          height={32}
          unoptimized
        />
        <h6 className={styles.videoInfoSubtitle}>
          {selectedVideo?.video?.author?.title}
        </h6>
      </div>
      <div className={styles.infoStatsContainer}>
        <span>
          {selectedVideo?.video?.stats?.views
            ? `${Number(selectedVideo?.video?.stats?.views).toLocaleString(
                'es-US'
              )} views `
            : '0 views'}
        </span>
        <span>
          {selectedVideo?.video?.publishedTimeText
            ? ` - ${selectedVideo?.video?.publishedTimeText}`
            : ''}
        </span>
      </div>
    </div>
  );
};

export default VideoPlayerInfo;
