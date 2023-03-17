import { useEffect } from 'react';
import styles from './styles/CategoriesList.module.css';
import UseFetchFromDB from '@/hooks/useFetchFromDB';
import videoStore from '@/store/videoStore';

const CategoriesList = () => {
  const { fetchFromDB, baseURL } = UseFetchFromDB();
  const addCategories = videoStore((state) => state.addCategories);
  const categories = videoStore((state) => state.categories);
  const keyword = videoStore((state) => state.addKeyword);

  async function getCategories() {
    try {
      const result = await fetchFromDB(`${baseURL}/categories`, 'GET');
      addCategories(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (categories?.length === 0) getCategories();
  }, []);

  return (
    <aside className={styles.categoriesContainer}>
      {categories?.map((category) => (
        <button
          key={category?.id}
          className={styles.categoryButton}
          onClick={() => keyword(category?.category_name)}
        >
          {category?.category_name.toUpperCase()}
        </button>
      ))}
    </aside>
  );
};

export default CategoriesList;
