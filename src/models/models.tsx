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
  Clicks: {
    type: String,
    default: 0,
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

const Games = new Schema({
  game: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export const GameModel = mongoose.models.Game || mongoose.model("Game", Games);
