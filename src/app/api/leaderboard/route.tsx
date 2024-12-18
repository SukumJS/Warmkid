import { NextResponse } from "next/server";
import { User } from "../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function GET() {
  await ConnectDB();
  const users = (await User.find({})).map((user) => ({
    user: `${user.nickname} ${user.name.split(" ")[0]} `,
    score: parseInt(user.Clicks),
  }));
  users.sort((a, b) => b.score - a.score);
  return NextResponse.json(users);
}
