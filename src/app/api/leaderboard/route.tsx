import { NextResponse } from "next/server";
import { User } from "../../../models/models";
import { ConnectDB } from "../../../config/config";

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export async function GET() {
  await ConnectDB();
  const users = (await User.find({})).map((user) => ({
    user: `${user.nickname} ${user.name.split(" ")[0]} `,
    score: sum(user.Game) + user.ClickArry.length,
  }));
  users.sort((a, b) => b.score - a.score);
  return NextResponse.json(users);
}
