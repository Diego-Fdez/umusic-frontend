export function filterEmptyVideos(videos) {
  const filteredVideos = videos?.filter(
    (video) =>
      (video?.type !== "playlist") &
      (video.type !== "channel") &
      (video?.video?.videoId !== undefined)
  );
  return filteredVideos;
}
