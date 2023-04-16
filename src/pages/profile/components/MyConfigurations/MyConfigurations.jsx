import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "./styles/MyConfigurations.module.css";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import persistedVideoStore from "@/store/persistedVideoStore";
import userStore from "@/store/userStore";
import videoStore from "@/store/videoStore";

const MyConfigurations = () => {
  const { fetchFromDB, loading, error } = UseFetchFromDB();
  const user = userStore((state) => state.userInfo);
  const setRooms = videoStore((state) => state.setRooms);
  const rooms = videoStore((state) => state.rooms);
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );
  const [defaultPlaylist, setDefaultPlaylist] = useState("");

  //It fetches the playlists from the database.
  const handlerGetAllPlaylists = async () => {
    const result = await fetchFromDB("/api/v1/my-rooms", "POST", {
      userId: user?.sub,
    });

    //if the result is an error, display it.
    if (result?.data?.error) return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    setRooms(result?.data);
  };

  useEffect(() => {
    if ((rooms.length === 0) & user?.sub) handlerGetAllPlaylists();
  }, [rooms, user]);

  //function to save user configs into the DB
  const handlerSaveConfigs = async () => {
    if (defaultPlaylist === "")
      return toast.info("Please select a default playlist");

    const result = await fetchFromDB("/api/v1/user-configs", "POST", {
      userId: user?.sub,
      roomId: defaultPlaylist,
      language: "en", //ToDo: Add language selection
    });

    //if the result is an error, display it.
    if (result?.data?.error) return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    toast.success("Configurations saved successfully");
    setCurrentPlaylist({
      _id: result?.data?.room_id,
      room_name: result?.data?.name[0]?.room_name,
    });
  };

  return (
    <>
      {!user?.sub ? (
        <></>
      ) : (
        <div className={styles.profileWrapper}>
          <div className={styles.profileTitle}>
            <h2>Configurations</h2>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.language}>
              <div>
                <p>Language:</p>
                <select className={styles.select} name='language'>
                  <option value=''>--Select a Language--</option>
                  <option value='es'>Spanish</option>
                  <option value='en'>English</option>
                </select>
              </div>
              <div>
                {rooms.length <= 0 ? (
                  <Link className={styles.link} href='/room'>
                    Create a playlist
                  </Link>
                ) : (
                  <>
                    <p>Default Playlist:</p>
                    <select
                      className={styles.select}
                      name='playlists'
                      onChange={(e) => setDefaultPlaylist(e.target.value)}
                    >
                      <option value=''>
                        {loading
                          ? "Loading Playlists"
                          : "--Select a Playlist--"}
                      </option>
                      {rooms?.map((room) => (
                        <option value={room?._id} key={room?._id}>
                          {room?.room_name}
                        </option>
                      ))}
                    </select>
                    <button
                      className={styles.saveButton}
                      onClick={() => handlerSaveConfigs()}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyConfigurations;
