import { create } from 'zustand';
import Cookies from 'js-cookie';
import {
  emptyVideosState,
  emptyVideoListState,
  emptyCategoriesState,
} from '@/models/emptyStateModels';

const videoStore = create((set) => ({
  videos: emptyVideosState,
  categories: emptyCategoriesState,
  keyword: 'todos',
  videoList: emptyVideoListState,
  currentVideoIndex: 0,
  shouldAutoPlay: true,
  currentVideoPlaying: {},
  relatedVideos: emptyVideosState,
  rooms: [],
  currentPlaylist: {},
  addVideos: (data) => {
    set((state) => ({
      videos: data,
    }));
  },
  addCategories: (data) => {
    set(() => ({
      categories: data,
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
  setRooms: (data) => {
    set((state) => ({
      rooms: data,
    }));
  },
  setCurrentPlaylist: (data) => {
    set((state) => ({
      currentPlaylist: data,
    }));
  },
}));

export default videoStore;
