import { useEffect, Suspense, useState } from 'react';
import mongoose from 'mongoose';
import styles from './styles/RoomScreen.module.css';
import videoStore from '@/store/videoStore';
import { Loader, Navbar, GoogleAnalytics, HeadScreen } from '@/components';
import PlayList from './components/PlayList/PlayList';
import VideoHeaders from './components/VideoHeaders/VideoHeaders';
import VideoScreen from './components/VideoScreen/VideoScreen';
import Room from '@/models/roomModel';
import db from '@/database/db';
import useWebSocket from '@/hooks/useWebSocket';

const RoomScreen = ({ data }) => {
  const { socket } = useWebSocket();
  const addVideoList = videoStore((state) => state.addVideoList);
  const [videos, setVideos] = useState([]);

  /* Adding the data to the state. */
  useEffect(() => {
    setVideos(data);
  }, [data]);

  // useEffect(() => {
  //   socket.emit('joinRoom', data[0]?._id);
  // }, []);

  //listen to the socket
  useEffect(() => {
    socket.on('newVideo', (video) => {
      // if (video._id === data[0]._id)
      setVideos((prevVideos) => [...prevVideos, video]);
    });

    return () => {
      socket.off('newVideo');
    };
  });

  //add videos to the store
  useEffect(() => {
    addVideoList(videos);
  }, [videos]);

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen
        title={'Playlist'}
        content={`¿Quieres crear tu propia lista de reproducción personalizada? ¡No hay problema! Nuestra app te 
        permite crear y compartir tus propias listas de reproducción, o colaborar con amigos para crear listas de 
        reproducción compartidas. ¡Explora nuestras listas de reproducción hoy y descubre la mejor música para 
        cada momento!`}
      />
      <GoogleAnalytics />
      <Navbar />
      <main className={styles.roomContainer}>
        <article className={styles.playerVideoContainer}>
          <VideoScreen />
          <VideoHeaders />
        </article>
        <aside>
          <PlayList />
        </aside>
      </main>
    </Suspense>
  );
};

export default RoomScreen;

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
