import { NextResponse } from "next/server";
import { User } from "../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const { answer, id } = await req.json();
    const score = [20, 40, 20, 60, 80, 60, 60, 80, 40, 20];
    const newAnswer = answer.map((ans: boolean, index: number) => {
      if (ans) {
        return score[index];
      } else {
        return 0;
      }
    });
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.Game = newAnswer;
    await user.save();
    return NextResponse.json({
      score: user.Game.reduce((a: number, b: number) => a + b, 0),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
