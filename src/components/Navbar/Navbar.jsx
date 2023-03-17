import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles/Navbar.module.css';
import userStore from '@/store/userStore';
import videoStore from '@/store/videoStore';
import { NavModal } from './components';

const Navbar = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const addKeyword = videoStore((state) => state.addKeyword);
  const { userInfo } = userStore((state) => state.user);
  //const nameUrl = window.location.href;

  /**The addKeyword function adds the keyword to the
   * keywords array in the state. The function then navigates to the home page*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      addKeyword(input);
      //if (nameUrl !== '/') router.push('/'); //ToDo
      setInput('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.logoContainer}>
        <Link href={'/'}>
          <h1 className={styles.logo}>UMUSIC</h1>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleSubmit;
        }}
        className={styles.searchContainer}
      >
        <input
          type='search'
          placeholder='Search your music'
          className={styles.searchInput}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' className={styles.searchButton}>
          <Image
            src='/search-icon.svg'
            alt='search-icon'
            className={styles.searchIcon}
            width={25.6}
            height={25.6}
            loading='lazy'
          />
        </button>
      </form>
      <nav className={styles.profileContainer}>
        <button
          className={styles.profileButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={userInfo?.picture ? userInfo?.picture : '/default-image.png'}
            alt={userInfo?.user_name ? userInfo?.user_name : 'user-image'}
            title={userInfo?.user_name ? userInfo?.user_name : 'Profile'}
            className={styles.profileImage}
            width={35.2}
            height={35.2}
            loading='lazy'
          />
        </button>
        <NavModal setIsOpen={setIsOpen} isOpen={isOpen} />
      </nav>
    </header>
  );
};

export default Navbar;
