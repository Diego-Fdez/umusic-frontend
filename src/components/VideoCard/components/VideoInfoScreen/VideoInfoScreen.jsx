import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles/VideoInfoScreen.module.css";
import userStore from "@/store/userStore";
import tempUserStore from "@/store/tempUserStore";
import UseVideos from "@/hooks/useVideos";

const VideoInfoScreen = ({ video }) => {
  const router = useRouter();
  const user = userStore((state) => state.userInfo);
  const tempUserInfo = tempUserStore((state) => state.tempUserInfo);
  const { handleAddVideoToList } = UseVideos();

  return (
    <div className={styles.videoCardTitle}>
      <Link href={`/watch/${video?.videoId}`}>
        <h4 className={styles.title}>{video?.title.slice(0, 60)}</h4>
      </Link>
      {router?.pathname === "/channel/[id]" ? (
        <></>
      ) : (
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
      )}
      <div className={styles.statsContainer}>
        <span>
          {video?.stats?.views
            ? `${Number(video?.stats?.views).toLocaleString("es-US")} views `
            : "0 views"}
        </span>
        <span>
          {video?.publishedTimeText ? ` - ${video?.publishedTimeText}` : ""}
        </span>
        {user?.sub || tempUserInfo?.sub ? (
          <button
            className={styles.addButton}
            onClick={() => handleAddVideoToList(video)}
          >
            <Image
              src='/add-icon.svg'
              alt='add-icon'
              width={100}
              height={100}
              className={styles.addIcon}
            />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default VideoInfoScreen;
