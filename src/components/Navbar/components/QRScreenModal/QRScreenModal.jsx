import { useEffect } from "react";
import styles from "./styles/QRScreenModal.module.css";
import UsePlaylist from "@/hooks/usePlaylist";
import userStore from "@/store/userStore";

const QRScreenModal = ({ modalOpen, setModalOpen }) => {
  const user = userStore((state) => state.userInfo);
  const token = userStore((state) => state.userToken);
  const { handleGetQRCode, qrDataURL, qrImage } = UsePlaylist();

  useEffect(() => {
    handleGetQRCode();
  }, [qrImage, user, token]);

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
