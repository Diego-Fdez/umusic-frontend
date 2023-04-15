import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./styles/SearchBar.module.css";
import videoStore from "@/store/videoStore";

const SearchBar = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const addKeyword = videoStore((state) => state.addKeyword);

  /**The addKeyword function adds the keyword to the
   * keywords array in the state. The function then navigates to the home page*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      addKeyword(input);
      if (router.pathname !== "/") router.push("/");
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyUp={(e) => {
        if (e.key === "Enter") handleSubmit;
      }}
      className={styles.searchContainer}
    >
      <input
        type='search'
        placeholder='Search your music'
        className={styles.searchInput}
        value={input}
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
  );
};

export default SearchBar;
