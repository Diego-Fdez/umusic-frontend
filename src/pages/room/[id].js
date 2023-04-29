import { useEffect, Suspense, lazy } from 'react';
import Image from 'next/image';
import mongoose from 'mongoose';
import styles from './styles/RoomScreen.module.css';
import videoStore from '@/store/videoStore';
import { Loader, HeadScreen, WithPrivateRoute } from '@/components';
import Room from '@/models/roomModel';
import db from '@/database/db';
import { metaPlaylistIDPageContent } from '@/utils/metaContents';
import UseWebSocket from '@/hooks/useWebSocket';
const Navbar = lazy(() => import('../../components/Navbar/Navbar'));
const PlayList = lazy(() => import('./components/PlayList/PlayList'));
const VideoHeaders = lazy(() =>
  import('./components/VideoHeaders/VideoHeaders')
);
const VideoScreen = lazy(() => import('./components/VideoScreen/VideoScreen'));

export default function RoomScreen({ data }) {
  const addVideoList = videoStore((state) => state.addVideoList);
  const { videos, setVideos } = UseWebSocket();

  /* Adding the data to the state. */
  useEffect(() => {
    setVideos(data);
  }, [data]);

  //add videos to the store
  useEffect(() => {
    addVideoList(videos);
  }, [videos]);

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={'Playlist'} content={metaPlaylistIDPageContent} />
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
      $unwind: '$video_id',
    },
    {
      $lookup: {
        from: 'videos',
        localField: 'video_id',
        foreignField: 'video_id',
        as: 'videos',
      },
    },
    {
      $unwind: '$videos',
    },
    {
      $lookup: {
        from: 'channels',
        localField: 'videos.video_id',
        foreignField: 'video_id',
        as: 'videos.channels',
      },
    },
    {
      $unwind: '$videos.channels',
    },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        video_id: 0,
        __v: 0,
        'videos._id': 0,
        'videos.createdAt': 0,
        'videos.updatedAt': 0,
        'videos.__v': 0,
        'videos.channels.createdAt': 0,
        'videos.channels.updatedAt': 0,
        'videos.channels.video_id': 0,
        'videos.channels._id': 0,
        'videos.channels.__v': 0,
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
