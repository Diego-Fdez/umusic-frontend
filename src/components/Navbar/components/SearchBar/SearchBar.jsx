import { useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './styles/SearchBar.module.css';
import videoStore from '@/store/videoStore';
import { toast } from 'react-toastify';

const SearchBar = () => {
  const router = useRouter();
  const addKeyword = videoStore((state) => state.addKeyword);
  const inputRef = useRef();

  /**The addKeyword function adds the keyword to the
   * keywords array in the state. The function then navigates to the home page*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = inputRef.current.value;
    if (!value) {
      return toast.error('Please enter a word');
    }
    addKeyword(value);
    if (router.pathname !== '/') router.push('/');
    inputRef.current.value = '';
  };

  return (
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
        ref={inputRef}
      />
      <button type='submit' className={styles.searchButton}>
        <Image
          src='/search-icon.svg'
          alt='search-icon'
          className={styles.searchIcon}
          width={25.6}
          height={25.6}
          loading='lazy'
          unoptimized
        />
      </button>
    </form>
  );
};

export default SearchBar;
