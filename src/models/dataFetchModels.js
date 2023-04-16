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

//function to create a new video object for the socket.emit
export function setDataNewVideo(currentPlaylist, user, video) {
  return {
    room_name: currentPlaylist?.room_name ? currentPlaylist?.room_name : "",
    user_id: user?.sub,
    videos: {
      channels: {
        channel_id: video?.author?.channelId,
        channel_pic_url: video?.author?.avatar[0]?.url,
        channel_title: video?.author?.title,
      },
      video_id: video?.videoId,
      video_length: video?.lengthSeconds,
      video_pic_url: video?.thumbnails[0]?.url,
      video_title: video?.title,
    },
    _id: currentPlaylist?._id,
  };
}
