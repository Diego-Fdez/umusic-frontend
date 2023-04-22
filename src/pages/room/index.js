import { Suspense, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles/RoomList.module.css";
import { Navbar, Loader, GoogleAnalytics, HeadScreen } from "@/components";
import ListScreen from "./components/ListScreen/ListScreen";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import { WithPrivateRoute } from "@/components/WithPrivateRoute";
import { metaPlaylistsPageContent } from "@/utils/metaContents";
import userStore from "@/store/userStore";

export default function RoomList() {
  const user = userStore((state) => state.userInfo);
  const { fetchFromDB, loading, error } = UseFetchFromDB();
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
    toast.success("Your room has been created successfully!");
    setRoomName("");
  };

  return (
    <Suspense fallback={<Loader />}>
      <HeadScreen title={"Playlists"} content={metaPlaylistsPageContent} />
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
