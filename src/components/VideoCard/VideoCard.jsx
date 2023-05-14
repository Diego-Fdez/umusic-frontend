import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/videoCard.module.css';
import { formattedTime } from '@/utils/formattedTime';
import VideoInfoScreen from './components/VideoInfoScreen/VideoInfoScreen';

const VideoCard = ({ video }) => {
  return (
    <div className={styles.videoCardContainer}>
      <Link href={`/watch/${video?.videoId}`}>
        <Image
          width={200}
          height={180}
          src={video?.thumbnails[0]?.url}
          alt={video?.videoId}
          loading='lazy'
          unoptimized
          className={styles.videoCardImage}
          onMouseOver={(e) =>
            (e.target.src =
              video?.movingThumbnails !== null
                ? video?.movingThumbnails[0]?.url
                : video?.thumbnails[0]?.url)
          }
          onMouseLeave={(e) => (e.target.src = video?.thumbnails[0]?.url)}
        />
      </Link>
      <div className={styles.durationContainer}>
        <p>{formattedTime(video?.lengthSeconds)}</p>
      </div>
      <VideoInfoScreen video={video} />
    </div>
  );
};

export default VideoCard;
