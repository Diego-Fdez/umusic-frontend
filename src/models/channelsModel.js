import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    channel_id: {
      type: String,
      required: true,
    },
    channel_tittle: {
      type: String,
      required: true,
    },
    channel_pic_url: {
      type: String,
    },
    video_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Videos',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Channels =
  mongoose.models.Channels || mongoose.model('Channels', channelSchema);
export default Channels;
