import mongoose from "mongoose";

const userConfigsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "en",
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
    },
  },
  {
    timestamps: true,
  }
);

const UserConfigs =
  mongoose.models.UserConfigs ||
  mongoose.model("UserConfigs", userConfigsSchema);
export default UserConfigs;
