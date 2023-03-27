/** It takes a user object and a video object and returns an object with some of the properties of the
 * user and video objects.*/
export function setDataVideo(user, video, playlistId) {
  return {
    roomId: playlistId,
    userId: user?.sub,
    videoId: video?.videoId,
    channelId: video?.author?.channelId,
    videoTitle: video?.title,
    channelTitle: video?.author?.title,
    videoPictureURL: video?.thumbnails[0]?.url,
    channelPictureURL: video?.author?.avatar[0]?.url,
    videoLength: video?.lengthSeconds,
  };
}
