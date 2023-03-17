import videoStore from '@/store/videoStore';

const UsePlaying = () => {
  const videos = videoStore((state) => state.videoList);
  const currentVideoIndex = videoStore((state) => state.currentVideoIndex);
  const setCurrentVideoIndex = videoStore(
    (state) => state.setCurrentVideoIndex
  );
  const setShouldAutoPlay = videoStore((state) => state.setShouldAutoPlay);

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
    setShouldAutoPlay(false);
  };

  //forward cycle
  const handleNext = () => {
    setCurrentVideoIndex((currentVideoIndex + 1) % videos?.length);
    setShouldAutoPlay(false);
  };

  return { handleEnded, playVideo, handlePrev, handleNext };
};

export default UsePlaying;
