import { useEffect, useState } from 'react';
import styles from './styles/QRScreenModal.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import userStore from '@/store/userStore';

const QRScreenModal = ({ modalOpen, setModalOpen }) => {
  const { fetchFromDB } = UseFetchFromDB();
  const userDb = userStore((state) => state.user);
  const [qrCode, setQRCode] = useState();

  async function fetchQR() {
    const setData = {
      id: userDb?.userInfo?.id,
      token: userDb?.music_token,
    };

    try {
      const result = await fetchFromDB(`/api/v1/qr`, 'POST', setData);
      setQRCode(result?.data);
    } catch (error) {
      console.log(error);
    }
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
