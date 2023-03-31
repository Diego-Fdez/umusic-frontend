import { useEffect, useState } from 'react';
import styles from './styles/CategoriesList.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import { Loader } from '@/components';
import persistedVideoStore from '@/store/persistedVideoStore';
import videoStore from '@/store/videoStore';

const CategoriesList = () => {
  const { fetchFromDB, loading } = UseFetchFromDB();
  const addCategories = persistedVideoStore((state) => state.addCategories);
  const categoriesState = persistedVideoStore((state) => state.categoriesState);
  const keyword = videoStore((state) => state.addKeyword);
  const [categories, setCategories] = useState([]);

  //It fetches the categories from the database and adds them to the state
  async function handleGetCategories() {
    try {
      const result = await fetchFromDB(`/api/v1/categories`, 'GET');
      /* Adding the categories to the state. */
      addCategories(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  /* Setting the categories to the categoriesState. */
  useEffect(() => {
    setCategories(categoriesState);
  }, [categoriesState]);

  /* Checking if the categories array is empty and if it is, it calls the handleGetCategories function. */
  useEffect(() => {
    categories?.length === 0 && handleGetCategories();
  }, [categories]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <aside className={styles.categoriesContainer}>
          {categories?.map((category) => (
            <button
              key={category?.id}
              className={styles.categoryButton}
              onClick={() => keyword(category?.category_name)}
            >
              {category?.category_name?.toUpperCase()}
            </button>
          ))}
        </aside>
      )}
    </>
  );
};

export default CategoriesList;
