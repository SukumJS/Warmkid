import { NextResponse } from "next/server";
import { User } from "../../../../../models/models";
import { ConnectDB } from "../../../../../config/config";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();
    const { answer } = await req.json();
    const score = [10,20]
    const newAnswer = answer.map((ans: boolean, index: number) => {
      if (ans) {
        return score[index];
      } else {
        return 0;
      }
    });
    const { id } = await params;
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
