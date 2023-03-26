import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    room_name: {
      type: String,
      required: true,
    },
    video_id: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
export default Room;
