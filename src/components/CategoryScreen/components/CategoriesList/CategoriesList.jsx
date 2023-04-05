import useSWR from 'swr';
import styles from './styles/CategoriesList.module.css';
import { Loader } from '@/components';
import videoStore from '@/store/videoStore';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoriesList = () => {
  const keyword = videoStore((state) => state.addKeyword);

  const { data, error, isLoading } = useSWR('/api/v1/categories', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <aside className={styles.categoriesContainer}>
          {data?.data?.map((category) => (
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
