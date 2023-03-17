import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/videoCard.module.css';
import userStore from '@/store/userStore';
import { formattedTime } from '@/utils/formattedTime';
import UseFetchFromDB from '@/hooks/useFetchFromDB';

const VideoCard = ({ video }) => {
  const { fetchFromDB, baseURL } = UseFetchFromDB();
  const user = userStore((state) => state.user);

  /** It creates an object with the data that will be sent to the database, and then calls the
   * `fetchFromDB` function from the `UseFetchFromDB` hook */
  const handleClick = async () => {
    /* Creating an object with the data that will be sent to the database. */
    const setData = {
      roomId: user?.userInfo?.room_id,
      userId: user?.userInfo?.id,
      videoId: video?.videoId,
      channelId: video?.author?.channelId,
      videoTitle: video?.title,
      channelTitle: video?.author?.title,
      videoPictureURL: video?.thumbnails[0]?.url,
      channelPictureURL: video?.author?.avatar[0]?.url,
      videoLength: video?.lengthSeconds,
    };

    try {
      /* Calling the `fetchFromDB` function from the `UseFetchFromDB` hook. */
      const result = await fetchFromDB(`${baseURL}/room`, 'POST', setData);
      console.log(result);
      // return (
      //   <Alert type='success'>
      //     <p>{result?.data}</p>
      //   </Alert>
      // );
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.videoCardContainer}>
        <Link href={`/watch/${video?.videoId}`}>
          <img
            src={video?.thumbnails[0]?.url}
            alt={video?.videoId}
            loading='lazy'
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
        <div className={styles.videoCardTitle}>
          <Link href={`/watch/${video?.videoId}`}>
            <h4 className={styles.title}>{video?.title.slice(0, 60)}</h4>
          </Link>
          <div className={styles.authorContainer}>
            <Image
              src={video?.author?.avatar[0]?.url}
              alt={video?.author?.title}
              className={styles.authorImage}
              width={24}
              height={24}
            />
            <Link href={`/channel/${video?.author?.channelId}`}>
              <h6 className={styles.subtitle}>{video?.author?.title}</h6>
            </Link>
          </div>
          <div className={styles.statsContainer}>
            <span>
              {video?.stats?.views
                ? `${Number(video?.stats?.views).toLocaleString(
                    'es-US'
                  )} views `
                : '0 views'}
            </span>
            <span>
              {video?.publishedTimeText ? ` - ${video?.publishedTimeText}` : ''}
            </span>
            <button className={styles.addButton} onClick={() => handleClick()}>
              <Image
                src='/add-icon.svg'
                alt='add-icon'
                width={100}
                height={100}
                className={styles.addIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
