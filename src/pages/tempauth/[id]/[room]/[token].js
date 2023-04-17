import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "../../styles/TempAuth.module.css";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import { Loader, GoogleAnalytics, HeadScreen } from "@/components";
import persistedVideoStore from "@/store/persistedVideoStore";
import Link from "next/link";
import tempUserStore from "@/store/tempUserStore";
import { metaTempAuthPageContent } from "@/utils/metaContents";

const TempAuth = () => {
  const { query } = useRouter();
  const { id, room, token } = query;
  const { fetchFromDB, error, loading } = UseFetchFromDB();
  const router = useRouter();
  const addTempUserInfo = tempUserStore((state) => state.addTempUserInfo);
  const addTempUserToken = tempUserStore((state) => state.addTempUserToken);
  const setTempUserIsAuth = tempUserStore((state) => state.setTempUserIsAuth);
  const setCurrentPlaylist = persistedVideoStore(
    (state) => state.setCurrentPlaylist
  );
  const [isTempLoginComplete, setIsTempLoginComplete] = useState(false);

  /**
   * It takes the id and token from the URL, sends a POST request to the server, and then redirects the
   * user to the home page
   */
  async function handlerTempLogin() {
    if (id === "" || token === "" || id === undefined || token === undefined) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    const setData = {
      id,
      name: "Diego",
      room: room,
    };

    const result = await fetchFromDB(
      `/api/v1/tempauth`,
      "POST",
      setData,
      token
    );

    /* Checking if there is an error, and if there is, it will display a toast error. */
    if (result?.status === "FAILED") return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    /* Checking if the user has completed the temporary login process. */
    if (!result?.data?.userInfo) {
      setIsTempLoginComplete(false);
      return toast.error("Something went wrong. Please try again.");
    }

    /* Setting the state of the tempUserStore and persistedVideoStore. */
    addTempUserInfo(result?.data?.userInfo);
    addTempUserToken(result?.data?.userToken);
    setTempUserIsAuth(true);
    setCurrentPlaylist({ _id: result?.data?.userInfo?.roomId });
    toast.success("Successfully logged in!");
    setIsTempLoginComplete(true);
  }

  //If the user has completed the temporary login process, then navigate to the home page
  async function navigateToHome() {
    if (isTempLoginComplete) {
      await router.replace("/");
    }
  }

  useEffect(() => {
    if (id && token) handlerTempLogin();
  }, [id, token]);

  useEffect(() => {
    navigateToHome();
  }, [isTempLoginComplete]);

  return (
    <>
      <HeadScreen
        title={"Temporary Authentication"}
        content={metaTempAuthPageContent}
      />
      <GoogleAnalytics />
      <div className={styles.temporaryAuth}>
        <Link href='/'>
          <h1>UMUSIC</h1>
        </Link>
        <h2>Making Science...</h2>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default TempAuth;
