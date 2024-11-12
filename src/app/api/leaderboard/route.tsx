import { NextResponse } from "next/server";
import { User } from "../../../../models/models";

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export async function GET() {
  const users = (await User.find({})).map((user) => ({
    user: user.name,
    score: sum(user.Game) + user.ClickArry.length,
  }));

  return NextResponse.json(users);
}
