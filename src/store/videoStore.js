import { create } from 'zustand';

const videoStore = create((set) => ({
  videos: [],
  keyword: 'todos',
  videoList: [],
  currentVideoIndex: 0,
  shouldAutoPlay: true,
  currentVideoPlaying: {},
  relatedVideos: [],
  rooms: [],
  currentPlaylist: {},
  addVideos: (data) => {
    set((state) => ({
      videos: data,
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
