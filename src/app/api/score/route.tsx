import { NextResponse } from "next/server";
import { ClickModel } from "../../../../models/models";
import { ConnectDB } from "../../../../config/config";

export async function POST(req: Request) {
  try {
    const { userID } = await req.json();
    ConnectDB();
    const user = await ClickModel.create({
      user_id: Object(userID),
      date: new Date(),
    });
    await user.save();
    return NextResponse.json({ message: "Click" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
