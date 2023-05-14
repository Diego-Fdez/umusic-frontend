import Image from 'next/image';
import ReactPlayer from 'react-player';
import styles from './styles/VideoScreen.module.css';
import UsePlaying from '@/hooks/usePlaying';
import videoStore from '@/store/videoStore';

const VideoScreen = () => {
  const videos = videoStore((state) => state.videoList);
  const currentVideoIndex = videoStore((state) => state.currentVideoIndex);
  const shouldAutoPlay = videoStore((state) => state.shouldAutoPlay);
  const { handlePrev, handleNext, handleEnded, shuffle, setShuffle } =
    UsePlaying();

  return (
    <div className={styles.playerWrapper}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videos[currentVideoIndex]?.videos?.video_id}`}
        width='100%'
        height='100%'
        controls={true}
        playing={shouldAutoPlay}
        onEnded={handleEnded}
      />
      <div className={styles.controlsWrapper}>
        <div className={styles.shuffle}>
          <label htmlFor='checkbox'>Shuffle</label>
          <input
            type='checkbox'
            id='checkbox'
            checked={shuffle}
            onChange={() => setShuffle(!shuffle)}
          />
        </div>
        <button onClick={handlePrev} className={styles.playButtons}>
          <Image
            src='/back-icon.svg'
            alt='back-icon'
            width={32}
            height={32}
            className={styles.playIcons}
            unoptimized
          />
        </button>
        <button onClick={handleNext} className={styles.playButtons}>
          <Image
            src='/next-icon.svg'
            alt='next-icon'
            width={32}
            height={32}
            className={styles.playIcons}
            unoptimized
          />
        </button>
      </div>
    </div>
  );
};

export default VideoScreen;
