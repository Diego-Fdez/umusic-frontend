import { useEffect } from 'react';
import styles from './styles/CategoriesList.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import videoStore from '@/store/videoStore';
import { Loader } from '@/components';

const CategoriesList = () => {
  const { fetchFromDB } = UseFetchFromDB();
  const addCategories = videoStore((state) => state.addCategories);
  const categories = videoStore((state) => state.categories);
  const loading = videoStore((state) => state.loading);
  const keyword = videoStore((state) => state.addKeyword);

  //It fetches the categories from the database and adds them to the state
  async function getCategories() {
    try {
      const result = await fetchFromDB(`/api/v1/categories`, 'GET');
      /* Adding the categories to the state. */
      addCategories(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (categories[0]?.category_name === '') getCategories();
  }, [categories[0]?.category_name]);

  return (
    <>
      {loading && <Loader />}
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
    </>
  );
};

export default CategoriesList;
