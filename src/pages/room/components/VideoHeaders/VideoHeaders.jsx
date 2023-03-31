import { useEffect } from 'react';
import Image from 'next/image';
import styles from './styles/VideoHeaders.module.css';
import videoStore from '@/store/videoStore';

const VideoHeaders = () => {
  const videos = videoStore((state) => state.videoList);
  const currentVideoIndex = videoStore((state) => state.currentVideoIndex);
  const currentVideoPlaying = videoStore((state) => state.currentVideoPlaying);
  const setCurrentVideoPlaying = videoStore(
    (state) => state.setCurrentVideoPlaying
  );

  useEffect(() => {
    /* Finding the video that matches the currentVideoIndex and setting it to the currentVideo state. */
    videos.find((video, i) => {
      if (i === currentVideoIndex) {
        setCurrentVideoPlaying(video);
        return;
      }
    });
  }, [currentVideoIndex, setCurrentVideoPlaying, videos]);

  return (
    <div className={styles.videoInfoContainer}>
      <h4 className={styles.videoRoomInfoTitle}>
        {currentVideoPlaying?.videos?.video_title}
      </h4>
      <div className={styles.authorContainer}>
        <Image
          src={currentVideoPlaying?.videos?.channels?.channel_pic_url}
          alt={currentVideoPlaying?.videos?.channels?.channel_title}
          className={styles.authorPicture}
          width={32}
          height={32}
        />
        <h6 className={styles.authorInfoSubtitle}>
          {currentVideoPlaying?.videos?.channels?.channel_title}
        </h6>
      </div>
    </div>
  );
};

export default VideoHeaders;
