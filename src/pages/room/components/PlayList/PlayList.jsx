import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "./styles/Playlist.module.css";
import UsePlaying from "@/hooks/usePlaying";
import videoStore from "@/store/videoStore";
import { formattedTime } from "@/utils/formattedTime";
import generateId from "@/utils/generateId";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import { Loader } from "@/components";

const PlayList = () => {
  const router = useRouter();
  const videos = videoStore((state) => state.videoList);
  const addVideos = videoStore((state) => state.addVideoList);
  const { playVideo } = UsePlaying();
  const { fetchFromDB, loading, error } = UseFetchFromDB();

  //function to delete a video from the playlist
  const handlerDeleteVideo = async (videoId) => {
    const result = await fetchFromDB("/api/v1/room", "DELETE", { id: videoId });

    //is checking if there is an error returned from the server
    if (error) return toast.error(error);
    if (result?.status === "FAILED") return toast.error(result?.data?.error);

    //filter out the video that is deleted from the list of videos in the store.
    const filteredVideos = videos.filter(
      (video) => video.videos.video_id !== videoId
    );
    addVideos(filteredVideos);

    toast.success(result?.data);

    //is checking if the playlist is empty.
    if (filteredVideos.length === 0) router.push("/room");
  };

  //function to delete all videos from the playlist
  const handlerDeleteAllVideos = async (id) => {
    const result = await fetchFromDB(`/api/v1/room/${id}`, "PUT");

    //is checking if there is an error returned from the server
    if (error) return toast.error(error);
    if (result?.status === "FAILED") return toast.error(result?.data?.error);

    //set the store to an empty array to clear the playlist.
    addVideos([]);

    toast.success(result?.data);

    //redirect to the room page.
    router.push("/room");
  };

  return (
    <div className={styles.roomListContainer}>
      <h2 className={styles.roomListTitle}>Video List</h2>
      <button
        className={styles.clearAllVideosButton}
        onClick={() => handlerDeleteAllVideos(videos[0]?._id)}
        title='Clear all videos'
      >
        <small>Clear all videos</small>
        <img src='/clean-icon.svg' alt='clear-icon' />
      </button>
      <>
        {videos?.map((video, index) => (
          <div key={generateId()} className={styles.roomListVideo}>
            <div className={styles.roomVideoThumbnail}>
              <button
                className={styles.roomThumbnailButton}
                onClick={() => playVideo(index)}
                title='Play'
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
            <button
              onClick={() => handlerDeleteVideo(video?.videos?.video_id)}
              title='Delete'
            >
              <img src='/delete-song-icon.svg' alt='delete-song-icon' />
            </button>
          </div>
        ))}
      </>
      {loading && <Loader />}
    </div>
  );
};

export default PlayList;
