import { useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { toast } from "react-toastify";
import { filterEmptyVideos } from "@/utils/handlerFilterVideos";
import { baseURL, options } from "@/utils/youtubeConfig";
import videoStore from "@/store/videoStore";
import UseFetchFromDB from "./useFetchFromDB";
import persistedVideoStore from "@/store/persistedVideoStore";
import userStore from "@/store/userStore";
import tempUserStore from "@/store/tempUserStore";
import { setDataVideo, setDataNewVideo } from "@/models/dataFetchModels";

const fetcher = (url) => fetch(url, options).then((res) => res.json());

const UseVideos = (urlPath) => {
  const addVideos = videoStore((state) => state.addVideos);
  const { fetchFromDB, error } = UseFetchFromDB();
  const userToken = userStore((state) => state.userToken);
  const userInfo = userStore((state) => state.userInfo);
  const tempUserInfo = tempUserStore((state) => state.tempUserInfo);
  const tempUserToken = tempUserStore((state) => state.tempUserToken);
  const currentPlaylist = persistedVideoStore((state) => state.currentPlaylist);
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );
  const [channelLoading, setChannelLoading] = useState(false);
  const [channelData, setChannelData] = useState(null);

  //fetching the videos from the API with swr
  const { data, isLoading } = useSWRImmutable(`${baseURL}/${urlPath}`, fetcher);

  //saving the videos state
  const saveVideosState = () => {
    if (!isLoading) {
      //filtering the empty videos
      const filteredVideos = filterEmptyVideos(data?.contents);
      addVideos(filteredVideos);
    }
  };

  //get the default playlist and set in the current playlist
  const handlerGetDefaultPlaylist = useMemo(() => {
    return async () => {
      if ((userToken !== "") & !currentPlaylist?._id) {
        const result = await fetchFromDB(
          `/api/v1/user-configs/${userInfo?.sub}`,
          "GET"
        );

        //if the result is an error, display it.
        if (result?.data?.error) return;
        if (error) return;

        setCurrentPlaylist({
          _id: result?.data?.room_id,
          room_name: result?.data?.name[0]?.room_name,
        });
      }
    };
  }, [userToken, currentPlaylist]);

  /** It creates an object with the data that will be sent to the database, and then calls the
   * `fetchFromDB` function from the `UseFetchFromDB` hook */
  const handleAddVideoToList = async (video, socket) => {
    /* Creating an object with the data that will be sent to the database. */
    const setData = setDataVideo(
      userInfo ? userInfo : tempUserInfo,
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
      userInfo || tempUserInfo,
      video
    );

    toast.success(result?.data);
    //socket.emit("addVideo", videoAdded);
  };

  //fetching channel information from Youtube API
  const getChannelInformation = async (id) => {
    /* Creating a new instance of the AbortController class. */
    const abortController = new AbortController();
    setChannelLoading(true);
    fetch(`${baseURL}/v1/channel/details/?id=${id}&hl=en&gl=US`, options, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => setChannelData(data))
      .catch((error) => toast.error("Error fetching channel information"))
      .finally(() => setChannelLoading(false));
  };

  return {
    saveVideosState,
    isLoading,
    data,
    handlerGetDefaultPlaylist,
    handleAddVideoToList,
    getChannelInformation,
    channelLoading,
    channelData,
  };
};

export default UseVideos;
