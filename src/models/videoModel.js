import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    video_id: {
      type: String,
      required: true,
    },
    video_tittle: {
      type: String,
      required: true,
    },
    video_pic_url: {
      type: String,
    },
    video_length: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Videos = mongoose.models.Videos || mongoose.model('Videos', videoSchema);
export default Videos;
