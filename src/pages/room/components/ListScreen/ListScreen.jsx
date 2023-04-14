import { useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "./styles/ListScreen.module.css";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import videoStore from "@/store/videoStore";
import userStore from "@/store/userStore";
import persistedVideoStore from "@/store/persistedVideoStore";
import { Loader } from "@/components";

const ListScreen = () => {
  const { fetchFromDB, loading, error } = UseFetchFromDB();
  const user = userStore((state) => state.userInfo);
  const setRooms = videoStore((state) => state.setRooms);
  const rooms = videoStore((state) => state.rooms);
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );

  //It fetches the playlists from the database.
  const handlerGetAllPlaylists = async () => {
    /* Checking if the user is logged in. If not, it will display a toast message. */
    if (!user) return toast.info("Please login to view your playlists");

    const result = await fetchFromDB("/api/v1/my-rooms", "POST", {
      userId: user?.sub,
    });

    if (result?.data?.error) {
      toast.error(result?.data?.error);
    }
    setRooms(result?.data);
    setCurrentPlaylist(result?.data[0]);
  };

  useEffect(() => {
    if (rooms.length === 0) handlerGetAllPlaylists();
  }, [rooms]);

  //function to delete a playlist.
  const deleteOnePlaylist = async (roomId) => {
    const result = await fetchFromDB(`/api/v1/room/${roomId}`, "DELETE");

    //if the result is an error, display it.
    if (result?.data?.error) return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    //filter the rooms array to remove the deleted playlist.
    const filteredRooms = rooms.filter((room) => room._id !== roomId);
    setRooms(filteredRooms);
    setCurrentPlaylist(filteredRooms[0]);
    toast.success("Playlist deleted successfully");
  };

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
