import { useEffect } from "react";
import Link from "next/link";
import styles from "./styles/ListScreen.module.css";
import videoStore from "@/store/videoStore";
import { Loader } from "@/components";
import UsePlaylist from "@/hooks/usePlaylist";

const ListScreen = () => {
  const { loading, handlerGetAllPlaylists, deleteOnePlaylist } = UsePlaylist();
  const rooms = videoStore((state) => state.rooms);

  useEffect(() => {
    if (rooms.length === 0) handlerGetAllPlaylists();
  }, [rooms]);

  return (
    <ul className={styles.listContainer}>
      {rooms.length === 0 ? (
        <h2>There are no playlists yet, please create one.</h2>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {rooms.map((room) => (
                <li key={room._i}>
                  <Link href={`/room/${room._id}`}>{room?.room_name}</Link>
                  <div>
                    <button
                      className={styles.btn}
                      title='Delete Playlist'
                      onClick={() => deleteOnePlaylist(room._id)}
                    >
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
            </>
          )}
        </>
      )}
    </ul>
  );
};

export default ListScreen;
