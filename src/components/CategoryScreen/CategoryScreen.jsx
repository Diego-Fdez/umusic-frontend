import { useFetch } from '@/hooks/useFetchFromYoutube';
import videoStore from '@/store/videoStore';
import { CategoriesList } from './components';

const CategoryScreen = () => {
  const keyword = videoStore((state) => state.keyword);
  useFetch(`v1/search/?q=${keyword}&hl=en&gl=US`);

  return <CategoriesList />;
};

export default CategoryScreen;
