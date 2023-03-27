import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styles from './styles/videoCard.module.css';
import { formattedTime } from '@/utils/formattedTime';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import { setDataVideo } from '@/models/dataFetchModels';
import { useAuth0 } from '@auth0/auth0-react';
import videoStore from '@/store/videoStore';

const VideoCard = ({ video }) => {
  const { fetchFromDB } = UseFetchFromDB();
  const { user } = useAuth0();
  const currentPlaylist = videoStore((state) => state.currentPlaylist);

  /** It creates an object with the data that will be sent to the database, and then calls the
   * `fetchFromDB` function from the `UseFetchFromDB` hook */
  const handleClick = async () => {
    /* Creating an object with the data that will be sent to the database. */
    const setData = setDataVideo(user, video, currentPlaylist?._id);

    try {
      /* Calling the `fetchFromDB` function from the `UseFetchFromDB` hook. */
      const result = await fetchFromDB(`/api/v1/room`, 'PUT', setData);

      if (result?.data?.error) toast.error(result?.data?.error);

      console.log(result);
      toast.success(result.data);
    } catch (error) {
      console.log(error);
    }
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
