import { create } from 'zustand';
import Cookies from 'js-cookie';

const videoStore = create((set) => ({
  videos: Cookies.get('videos') ? JSON.parse(Cookies.get('videos')) : [],
  categories: Cookies.get('categories')
    ? JSON.parse(Cookies.get('categories'))
    : [{ id: 0, category_name: '' }],
  loading: false,
  error: null,
  keyword: 'todos',
  videoList: [],
  currentVideoIndex: Cookies.get('currentVideoIndex')
    ? JSON.parse(Cookies.get('currentVideoIndex'))
    : 0,
  shouldAutoPlay: true,
  currentVideoPlaying: Cookies.get('currentVideoPlaying')
    ? JSON.parse(Cookies.get('currentVideoPlaying'))
    : {},
  relatedVideos: [],
  addVideos: (data) => {
    set((state) => ({
      videos: data,
    }));
    Cookies.set('videos', JSON.stringify(data), { expires: 300 });
  },
  addCategories: (data) => {
    set((state) => ({
      categories: data,
    }));
    Cookies.set('categories', JSON.stringify(data), { expires: 600 });
  },
  setLoading: (data) => {
    set((state) => ({
      loading: data,
    }));
  },
  setError: (data) => {
    set((state) => ({
      error: data,
    }));
  },
  addKeyword: (data) => {
    set((state) => ({
      keyword: data,
    }));
  },
  addVideoList: (data) => {
    set((state) => ({
      videoList: data,
    }));
  },
  addRelatedVideos: (data) => {
    set((state) => ({
      relatedVideos: data,
    }));
  },
  setCurrentVideoIndex: (data) => {
    set((state) => ({
      currentVideoIndex: data,
    }));
    Cookies.set('currentVideoIndex', JSON.stringify(data), { expires: 300 });
  },
  setShouldAutoPlay: (data) => {
    set((state) => ({
      shouldAutoPlay: data,
    }));
  },
  setCurrentVideoPlaying: (data) => {
    set((state) => ({
      currentVideoPlaying: data,
    }));
    Cookies.set('currentVideoPlaying', JSON.stringify(data), { expires: 300 });
  },
}));

export default videoStore;
