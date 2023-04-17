import useSWRImmutable from "swr/immutable";
import styles from "./styles/CategoriesList.module.css";
import { Loader } from "@/components";
import videoStore from "@/store/videoStore";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoriesList = () => {
  //to add keyword to the videoStore
  const addKeyword = videoStore((state) => state.addKeyword);

  // Fetching categories from the API
  const { data, isLoading } = useSWRImmutable("/api/v1/categories", fetcher);

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
              onClick={() => addKeyword(category?.category_name)}
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
