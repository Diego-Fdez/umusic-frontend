import { Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/RoomList.module.css';
import { Navbar, Loader, GoogleAnalytics, HeadScreen } from '@/components';
import ListScreen from './components/ListScreen/ListScreen';
import UseFetchFromDB from '@/hooks/useFetchFromDB';

const RoomList = () => {
  const { user } = useAuth0();
  const { fetchFromDB, loading, error } = UseFetchFromDB();
  const [roomName, setRoomName] = useState('');

  const handlerAddPlaylist = async (e) => {
    e.preventDefault();

    const setData = {
      userId: user?.sub,
      roomName: roomName,
    };

    const result = await fetchFromDB('/api/v1/room', 'POST', setData);

    if (result?.data?.error) {
      toast.error(result?.data?.error);
      setRoomName('');
    }

    toast.success(result?.data);
    setRoomName('');
  };

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen
        title={'Playlists'}
        content={`¿Quieres crear tu propia lista de reproducción personalizada? ¡No hay problema! Nuestra app te 
        permite crear y compartir tus propias listas de reproducción, o colaborar con amigos para crear listas de 
        reproducción compartidas. ¡Explora nuestras listas de reproducción hoy y descubre la mejor música para 
        cada momento!`}
      />
      <GoogleAnalytics />
      {error && toast.error(error)}
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <main className={`${styles.container} ${styles.neonBg}`}>
          <h2>Playlists</h2>
          <form
            className={styles.addPlaylistForm}
            onSubmit={handlerAddPlaylist}
          >
            <input
              type='text'
              placeholder='Playlist Name'
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              className={styles.addPlaylistButton}
              type='submit'
              title='Add Playlist'
            >
              <img
                src='/add-playlist.svg'
                alt='add-playlist-icon'
                className={styles.addPlaylistIcon}
              />
            </button>
          </form>
          <ListScreen />
        </main>
      )}
    </Suspense>
  );
};

export default RoomList;
