import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles/QRScreenModal.module.css";
import UseFetchFromDB from "@/hooks/useFetchFromDB";
import userStore from "@/store/userStore";
import persistedVideoStore from "@/store/persistedVideoStore";

const QRScreenModal = ({ modalOpen, setModalOpen }) => {
  const { fetchFromDB, error } = UseFetchFromDB();
  const userInfo = userStore((state) => state.userInfo);
  const token = userStore((state) => state.userToken);
  const currentPlaylist = persistedVideoStore((state) => state.currentPlaylist);
  const [qrImage, setQRImage] = useState("");
  const [qrDataURL, setQRDataURL] = useState("");

  async function handleGetQRCode() {
    /* This is setting the data that will be sent to the server. */
    const setData = {
      id: userInfo?.sub,
      room: currentPlaylist?._id,
      token: token,
    };

    const result = await fetchFromDB(`/api/v1/qr`, "POST", setData);

    /* This is checking if there is an error. If there is, it will return an error message. */
    if (result?.status === "FAILED") return toast.error(result?.data?.error);
    if (error) return toast.error(error);

    setQRDataURL(result?.data?.linkURL);
    setQRImage(result?.data?.qrImage);
  }

  useEffect(() => {
    if (
      (userInfo?.sub !== "") &
      (token !== "") &
      (currentPlaylist?._id !== "") &
      (qrImage === "")
    )
      handleGetQRCode();
  }, [userInfo, token, currentPlaylist, qrImage]);

  return (
    <div
      className={styles.qrContainer}
      style={{
        display: modalOpen ? "flex" : "none",
      }}
    >
      <button onClick={() => setModalOpen(!modalOpen)}>
        <img
          src='/close-icon.svg'
          alt='close-icon'
          className={styles.closeIcon}
        />
      </button>
      <div className={styles.qrBox}>
        <img src={qrImage} alt='qr-image' />
        <div className={styles.qrTextContainer}>
          <p>{qrDataURL.substring(0, 26)}</p>
          <button onClick={() => navigator.clipboard.writeText(qrDataURL)}>
            <p>Copy Link</p>
            <img
              src='/copy-link-icon.svg'
              alt='copy-link-icon'
              className={styles.copyIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScreenModal;
