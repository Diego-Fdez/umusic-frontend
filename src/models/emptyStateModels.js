export const emptyVideosState = [
  {
    video: {
      author: {
        avatar: [
          {
            url: '',
          },
        ],
        channelId: '',
        title: '',
      },
      lengthSeconds: 0,
      movingThumbnails: [
        {
          url: '',
        },
      ],
      publishedTimeText: '',
      stats: {
        views: 0,
      },
      thumbnails: [
        {
          url: '',
        },
      ],
      title: '',
      videoId: '',
    },
  },
];

export const emptyUserState = {
  music_token: '',
  userInfo: {
    id: '',
    email: '',
    user_name: '',
    picture: '',
    room_id: '',
    user_type: '',
  },
};

export const emptyCategoriesState = [
  {
    id: 0,
    category_name: '',
  },
];

export const emptyVideoListState = [
  {
    channel_id: '',
    channel_pic_url: '',
    channel_title: '',
    id: 0,
    room_id: '',
    user_id: '',
    user_name: '',
    video_id: '',
    video_length: '',
    video_pic_url: '',
    video_title: '',
  },
];
