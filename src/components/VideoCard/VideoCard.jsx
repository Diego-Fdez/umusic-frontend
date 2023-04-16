import Link from "next/link";
import { toast } from "react-toastify";
import styles from "./styles/videoCard.module.css";
import { formattedTime } from "@/utils/formattedTime";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import { setDataVideo, setDataNewVideo } from "@/models/dataFetchModels";
import persistedVideoStore from "@/store/persistedVideoStore";
import tempUserStore from "@/store/tempUserStore";
import userStore from "@/store/userStore";
import VideoInfoScreen from "./components/VideoInfoScreen/VideoInfoScreen";

const VideoCard = ({ video, socket }) => {
  const { fetchFromDB, error } = UseFetchFromDB();
  const user = userStore((state) => state.userInfo);
  const tempUserInfo = tempUserStore((state) => state.tempUserInfo);
  const tempUserToken = tempUserStore((state) => state.tempUserToken);
  const currentPlaylist = persistedVideoStore((state) => state.currentPlaylist);

  /** It creates an object with the data that will be sent to the database, and then calls the
   * `fetchFromDB` function from the `UseFetchFromDB` hook */
  const handleAddVideoToList = async () => {
    /* Creating an object with the data that will be sent to the database. */
    const setData = setDataVideo(
      user ? user : tempUserInfo,
      video,
      currentPlaylist?._id
    );

    /* saving a new video into roomList */
    const result = await fetchFromDB(
      `/api/v1/room`,
      "PUT",
      setData,
      tempUserToken
    );

    /* Checking if there is an error in the result of the fetch, and if there is, it shows a toast
      with the error. */
    if (result?.data?.error) return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    /* Creating an object with the data that will be sent to the socket. */
    const videoAdded = setDataNewVideo(
      currentPlaylist,
      user || tempUserInfo,
      video
    );

    toast.success(result?.data);
    socket.emit("addVideo", videoAdded);
  };

  return (
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
      <VideoInfoScreen
        video={video}
        handleAddVideoToList={handleAddVideoToList}
      />
    </div>
  );
};

export default VideoCard;
