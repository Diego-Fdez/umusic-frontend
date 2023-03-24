import { create } from 'zustand';
import Cookies from 'js-cookie';
import {
  emptyVideosState,
  emptyVideoListState,
  emptyCategoriesState,
} from '@/models/emptyStateModels';

const getCategoriesFromCookie = (key) =>
  Cookies.get(key) && JSON.parse(Cookies.get(key));
const setCategoriesToCookie = (key, value) =>
  Cookies.set(key, JSON.stringify(value));

const videoStore = create((set) => ({
  videos: emptyVideosState,
  categories: getCategoriesFromCookie('categories') || emptyCategoriesState,
  loading: false,
  error: null,
  keyword: 'todos',
  videoList: emptyVideoListState,
  currentVideoIndex: 0,
  shouldAutoPlay: true,
  currentVideoPlaying: {},
  relatedVideos: emptyVideosState,
  addVideos: (data) => {
    set((state) => ({
      videos: data,
    }));
  },
  addCategories: (categories) => {
    set(() => {
      setCategoriesToCookie(
        'categories',
        categories ? categories : emptyCategoriesState
      );
      return { categories };
    });
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
  },
}));

export default videoStore;
