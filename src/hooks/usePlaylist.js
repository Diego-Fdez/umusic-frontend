import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import UseFetchFromDB from "./useFetchFromDB";
import userStore from "@/store/userStore";
import persistedVideoStore from "@/store/persistedVideoStore";
import videoStore from "@/store/videoStore";

const UsePlaylist = () => {
  const router = useRouter();
  const { fetchFromDB, loading, error } = UseFetchFromDB();
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );
  const currentPlaylist = persistedVideoStore((state) => state.currentPlaylist);
  const user = userStore((state) => state.userInfo);
  const token = userStore((state) => state.userToken);
  const setRooms = videoStore((state) => state.setRooms);
  const rooms = videoStore((state) => state.rooms);
  const videos = videoStore((state) => state.videoList);
  const addVideos = videoStore((state) => state.addVideoList);
  const [qrImage, setQRImage] = useState("");
  const [qrDataURL, setQRDataURL] = useState("");
  const [roomName, setRoomName] = useState("");

  //create a new playlist
  const handlerAddPlaylist = async (e) => {
    e.preventDefault();

    const validRoomName = "^[A-Za-z0-9]+$";

    if (!roomName.match(validRoomName))
      return toast.error(
        "Invalid playlist name, only numbers and letters are allowed."
      );

    const setData = {
      userId: user?.sub,
      roomName: roomName,
    };

    const result = await fetchFromDB("/api/v1/room", "POST", setData);

    /* Checking if there is an error in the response from the server. If there is an error, it will
  display the error message and clear the input field. */
    if (result?.data?.error) {
      setRoomName("");
      return toast.error(result?.data?.error);
    }

    //if there is an error, display the error
    if (error) {
      setRoomName("");
      return toast.error(error);
    }

    //if there is no error, display the success message
    toast.success("Your room has been created successfully!");
    setRoomName("");
  };

  //if the user has no playlists, it will create one.
  const handlerSaveDefaultPlaylist = async (roomId) => {
    const result = await fetchFromDB(
      `/api/v1/user-configs/${user?.sub}`,
      "GET"
    );

    if (result?.data?.error === "No configs found") {
      const newUserConfigs = await fetchFromDB("/api/v1/user-configs", "POST", {
        userId: user?.sub,
        roomId: roomId,
      });

      //if the result is an error, return.
      if (!result?.data?.error || !error)
        //set the current playlist to the new user configs.
        setCurrentPlaylist({
          _id: newUserConfigs?.data?.room_id,
          room_name: newUserConfigs?.data?.name[0]?.room_name,
        });
    }
  };

  //It fetches the playlists from the database.
  const handlerGetAllPlaylists = async () => {
    /* Checking if the user is logged in. If not, it will display a toast message. */
    if (!user?.sub) return toast.info("Please login to view your playlists");

    const result = await fetchFromDB("/api/v1/my-rooms", "POST", {
      userId: user?.sub,
    });

    //if the result is an error, display it.
    if (result?.data?.error) return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    setRooms(result?.data);
    //if the user has no playlists, it will create one.
    await handlerSaveDefaultPlaylist(result?.data[0]?._id);
  };

  //function to delete a playlist.
  const deleteOnePlaylist = async (roomId) => {
    const result = await fetchFromDB(`/api/v1/room/${roomId}`, "DELETE");

    //if the result is an error, display it.
    if (result?.data?.error) return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    //filter the rooms array to remove the deleted playlist.
    const filteredRooms = rooms.filter((room) => room._id !== roomId);
    setRooms(filteredRooms);
    toast.success("Playlist deleted successfully");
  };

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

  //function to get the QR code.
  const handleGetQRCode = useMemo(() => {
    return async () => {
      /* This is setting the data that will be sent to the server. */
      const setData = {
        id: user?.sub,
        room: currentPlaylist?._id,
        token: token,
      };

      if (
        (user?.sub !== "") &
        (currentPlaylist?._id !== "") &
        (qrImage === "")
      ) {
        const result = await fetchFromDB(`/api/v1/qr`, "POST", setData);

        /* This is checking if there is an error. If there is, it will return an error message. */
        if (result?.status === "FAILED")
          return toast.error(result?.data?.error);
        if (error) return toast.error(error);

        setQRDataURL(result?.data?.linkURL);
        setQRImage(result?.data?.qrImage);
      }
    };
  }, [user]);

  return {
    handlerAddPlaylist,
    roomName,
    setRoomName,
    loading,
    handlerGetAllPlaylists,
    deleteOnePlaylist,
    handlerDeleteVideo,
    handlerDeleteAllVideos,
    handleGetQRCode,
    qrDataURL,
    qrImage,
  };
};

export default UsePlaylist;
