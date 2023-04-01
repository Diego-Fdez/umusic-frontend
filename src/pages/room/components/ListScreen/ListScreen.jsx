import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import styles from './styles/ListScreen.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import videoStore from '@/store/videoStore';
import userStore from '@/store/userStore';
import persistedVideoStore from '@/store/persistedVideoStore';

const ListScreen = () => {
  const { fetchFromDB, loading, error } = UseFetchFromDB();
  const user = userStore((state) => state.userInfo);
  const setRooms = videoStore((state) => state.setRooms);
  const rooms = videoStore((state) => state.rooms);
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );

  //It fetches the playlists from the database.
  const fetchPlaylists = async () => {
    /* Checking if the user is logged in. If not, it will display a toast message. */
    if (!user) return toast.info('Please login to view your playlists');

    const result = await fetchFromDB('/api/v1/my-rooms', 'POST', {
      userId: user?.sub,
    });

    if (result?.data?.error) {
      toast.error(result?.data?.error);
    }
    setRooms(result?.data);
    setCurrentPlaylist(result?.data[0]);
  };

  useEffect(() => {
    if (rooms.length === 0) fetchPlaylists();
  }, [rooms]);

  return (
    <ul className={styles.listContainer}>
      {rooms.map((room) => (
        <li key={room._i}>
          <Link href={`/room/${room._id}`}>{room?.room_name}</Link>
          <div>
            <button className={styles.btn} title='Delete Playlist'>
              Delete
              <img
                src='/delete-playlist.svg'
                alt='delete-playlist-icon'
                className={styles.deletePlaylistIcon}
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListScreen;
