export function filterEmptyVideos(videos) {
  const filteredVideos = videos?.filter((video) => video?.type === "video");
  return filteredVideos;
}
