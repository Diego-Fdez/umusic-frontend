import { useEffect, Suspense, useState } from "react";
import Image from "next/image";
import mongoose from "mongoose";
import io from "socket.io-client";
import styles from "./styles/RoomScreen.module.css";
import videoStore from "@/store/videoStore";
import { Loader, Navbar, GoogleAnalytics, HeadScreen } from "@/components";
import PlayList from "./components/PlayList/PlayList";
import VideoHeaders from "./components/VideoHeaders/VideoHeaders";
import VideoScreen from "./components/VideoScreen/VideoScreen";
import Room from "@/models/roomModel";
import db from "@/database/db";
import { WithPrivateRoute } from "@/components/WithPrivateRoute";
import { metaPlaylistIDPageContent } from "@/utils/metaContents";

let socket;

export default function RoomScreen({ data }) {
  const addVideoList = videoStore((state) => state.addVideoList);
  const [videos, setVideos] = useState([]);

  /* Adding the data to the state. */
  useEffect(() => {
    setVideos(data);
  }, [data]);

  //init socket
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER);
    socket.emit("joinRoom", data[0]?._id);
  }, []);

  //listen to the socket
  useEffect(() => {
    const receivedVideo = (video) => {
      if (video._id === data[0]._id)
        setVideos((prevVideos) => [...prevVideos, video]);
    };

    socket.on("newVideo", receivedVideo);

    return () => {
      socket.off("newVideo", receivedVideo);
    };
  }, [videos]);

  //add videos to the store
  useEffect(() => {
    addVideoList(videos);
  }, [videos]);

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={"Playlist"} content={metaPlaylistIDPageContent} />
      <GoogleAnalytics />
      <Navbar />
      <main className={styles.roomContainer}>
        {videos.length <= 0 ? (
          <div className={styles.noPlaylistVideos}>
            <Image
              src='/styled-men.jpg'
              alt='styled-men'
              width={300}
              height={300}
              loading='lazy'
            />
            <h3>There are no videos in this playlist</h3>
          </div>
        ) : (
          <>
            <article className={styles.playerVideoContainer}>
              <VideoScreen />
              <VideoHeaders />
            </article>
            <aside>
              <PlayList />
            </aside>
          </>
        )}
      </main>
    </Suspense>
  );
}

RoomScreen.Auth = WithPrivateRoute;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  /* A query to get the data from the database. */
  await db.connect();

  /* A query to get the data from the database. */
  const data = await Room.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $unwind: "$video_id",
    },
    {
      $lookup: {
        from: "videos",
        localField: "video_id",
        foreignField: "video_id",
        as: "videos",
      },
    },
    {
      $unwind: "$videos",
    },
    {
      $lookup: {
        from: "channels",
        localField: "videos.video_id",
        foreignField: "video_id",
        as: "videos.channels",
      },
    },
    {
      $unwind: "$videos.channels",
    },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        video_id: 0,
        __v: 0,
        "videos._id": 0,
        "videos.createdAt": 0,
        "videos.updatedAt": 0,
        "videos.__v": 0,
        "videos.channels.createdAt": 0,
        "videos.channels.updatedAt": 0,
        "videos.channels.video_id": 0,
        "videos.channels._id": 0,
        "videos.channels.__v": 0,
      },
    },
  ]);

  await db.disconnect();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
}
