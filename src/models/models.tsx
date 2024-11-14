import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  ClickArry: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  Game: {
    type: [Number],
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

const Click = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const ClickModel =
  mongoose.models.Click || mongoose.model("Click", Click);
