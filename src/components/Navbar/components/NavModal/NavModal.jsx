import Link from 'next/link';
import Image from 'next/image';
import userStore from '@/store/userStore';
import styles from './styles/NavModal.module.css';

const NavModal = ({ isOpen, setIsOpen }) => {
  const { userInfo } = userStore((state) => state.user);

  return (
    <div
      className={styles.navbarModalContainer}
      style={{
        display: isOpen ? 'flex' : 'none',
      }}
    >
      <ul className={styles.navbarModalList}>
        <li className={styles.navbarModalListItem}>
          <Link href={'/login'} onClick={() => setIsOpen(!isOpen)}>
            <Image
              src='/login-icon.svg'
              alt='login-icon'
              className={styles.navbarModalItemImg}
              width={24}
              height={24}
              loading='lazy'
            />
            <p>Login</p>
          </Link>
        </li>
        <li className={styles.navbarModalListItem}>
          <Link href={'/qr'} onClick={() => setIsOpen(!isOpen)}>
            <Image
              src='/qrcode-icon.svg'
              alt='qrcode-icon'
              className={styles.navbarModalItemImg}
              width={24}
              height={24}
              loading='lazy'
            />
            <p>Generate QR</p>
          </Link>
        </li>
        <li className={styles.navbarModalListItem}>
          <Link
            href={`/room/${userInfo?.room_id}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src='/music-list-icon.svg'
              alt='music-list-icon'
              className={styles.navbarModalItemImg}
              width={24}
              height={24}
              loading='lazy'
            />
            <p>My Room</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavModal;
