import { NextResponse } from "next/server";
import { User } from "../../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const { answer, id } = await req.json();
    const score = [10, 20];
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
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
