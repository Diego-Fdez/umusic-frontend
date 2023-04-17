import { useState, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import styles from "./styles/CategoriesList.module.css";
import videoStore from "@/store/videoStore";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoriesList = () => {
  //to add keyword to the videoStore
  const addKeyword = videoStore((state) => state.addKeyword);
  const [categories, setCategories] = useState([]);

  // Fetching categories from the API
  const { data } = useSWRImmutable("/api/v1/categories", fetcher);

  useEffect(() => {
    if (data) {
      setCategories(data?.data);
    }
  }, [data]);

  return (
    <>
      <aside className={styles.categoriesContainer}>
        {categories?.map((category) => (
          <button
            key={category?._id}
            className={styles.categoryButton}
            onClick={() => addKeyword(category?.category_name)}
          >
            {category?.category_name?.toUpperCase()}
          </button>
        ))}
      </aside>
    </>
  );
};

export default CategoriesList;
