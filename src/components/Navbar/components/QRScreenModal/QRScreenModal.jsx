import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './styles/QRScreenModal.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import userStore from '@/store/userStore';
import videoStore from '@/store/videoStore';

const QRScreenModal = ({ modalOpen, setModalOpen }) => {
  const { fetchFromDB, error } = UseFetchFromDB();
  const userInfo = userStore((state) => state.userInfo);
  const token = userStore((state) => state.userToken);
  const currentPlaylist = videoStore((state) => state.currentPlaylist);
  const [qrCode, setQRCode] = useState();

  async function fetchQR() {
    const setData = {
      id: userInfo?.sub,
      room: currentPlaylist?._id,
      token: token,
    };

    const result = await fetchFromDB(`/api/v1/qr`, 'POST', setData);
    setQRCode(result?.data);
  }

  useEffect(() => {
    fetchQR();
  }, []);

  return (
    <div
      className={styles.qrContainer}
      style={{
        display: modalOpen ? 'flex' : 'none',
      }}
    >
      {error && toast.error(error)}
      <button onClick={() => setModalOpen(!modalOpen)}>
        <img
          src='/close-icon.svg'
          alt='close-icon'
          className={styles.closeIcon}
        />
      </button>
      <div className={styles.qrBox}>
        <img src={qrCode} alt='qr-image' />
      </div>
    </div>
  );
};

export default QRScreenModal;
