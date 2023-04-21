import { useState } from "react";
import { useRouter } from "next/router";
import videoStore from "@/store/videoStore";

const UsePlaying = () => {
  const router = useRouter();
  const videos = videoStore((state) => state.videoList);
  const videosState = videoStore((state) => state.videos);
  const currentVideoIndex = videoStore((state) => state.currentVideoIndex);
  const setCurrentVideoIndex = videoStore(
    (state) => state.setCurrentVideoIndex
  );
  const setShouldAutoPlay = videoStore((state) => state.setShouldAutoPlay);
  const [selectedVideo, setSelectedVideo] = useState({});

  //cycle between videos
  const handleEnded = () => {
    setCurrentVideoIndex((currentVideoIndex + 1) % videos?.length);
    setShouldAutoPlay(true);
  };

  /** When the user clicks on a video, the video should play and the video index should be set to the
   * index of the video that was clicked on.*/
  const playVideo = (index) => {
    setCurrentVideoIndex(index);
    setShouldAutoPlay(true);
  };

  //cycle backwards
  const handlePrev = () => {
    setCurrentVideoIndex(
      (currentVideoIndex - 1 + videos?.length) % videos?.length
    );
    setShouldAutoPlay(true);
  };

  //forward cycle
  const handleNext = () => {
    setCurrentVideoIndex((currentVideoIndex + 1) % videos?.length);
    setShouldAutoPlay(true);
  };

  const handlerNextVideo = () => {
    router.push(`/watch/${videosState[0]?.video?.videoId}`);
  };

  /**
   * Find the video with the id that matches the id passed in as an argument and set that video as the
   * selected video.
   */
  const getSelectedVideo = (id) => {
    if (id) {
      const video = videosState?.find((video) => video.video?.videoId === id);
      setSelectedVideo(video);
    }
  };

  return {
    handleEnded,
    playVideo,
    handlePrev,
    handleNext,
    getSelectedVideo,
    handlerNextVideo,
    selectedVideo,
  };
};

export default UsePlaying;
