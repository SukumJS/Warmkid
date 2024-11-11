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
    const { id } = await params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.Game = answer;
    await user.save();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
