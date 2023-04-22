import { useEffect, useState } from "react";
import io from "socket.io-client";
import persistedVideoStore from "@/store/persistedVideoStore";

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER);

const UseWebSocket = () => {
  const currentPlaylist = persistedVideoStore((state) => state.currentPlaylist);
  const [videos, setVideos] = useState([]);

  //enable connection to the socket server
  useEffect(() => {
    socket.emit("joinRoom", currentPlaylist?._id);
  }, []);

  //listen to the socket
  useEffect(() => {
    const receivedVideo = (video) => {
      setVideos((prevVideos) => [...prevVideos, video]);
    };

    socket.on("newVideo", receivedVideo);

    return () => {
      socket.off("newVideo", receivedVideo);
    };
  }, [videos]);

  return { socket, videos, setVideos };
};

export default UseWebSocket;
