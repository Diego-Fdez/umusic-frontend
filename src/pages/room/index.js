import { Suspense } from 'react';
import { toast } from 'react-toastify';
import styles from './styles/RoomList.module.css';
import {
  Navbar,
  Loader,
  GoogleAnalytics,
  HeadScreen,
  WithPrivateRoute,
} from '@/components';
import ListScreen from './components/ListScreen/ListScreen';
import { metaPlaylistsPageContent } from '@/utils/metaContents';
import UsePlaylist from '@/hooks/usePlaylist';

export default function RoomList() {
  const { handlerAddPlaylist, roomName, setRoomName, loading } = UsePlaylist();

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={'Playlists'} content={metaPlaylistsPageContent} />
      <GoogleAnalytics />
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
              value={roomName}
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
          {loading ? <Loader /> : <ListScreen />}
        </main>
      )}
    </Suspense>
  );
}

RoomList.Auth = WithPrivateRoute;
