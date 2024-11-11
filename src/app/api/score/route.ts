import { NextResponse } from "next/server";
import { ClickModel } from "../../../../models/models";
import { ConnectDB } from "../../../../config/config";

export async function POST(req: Request) {
  try {
    const { user_ID } = await req.json();
    await ConnectDB();
    const user = await ClickModel.create({
      user_id: Object(user_ID),
      date: new Date(),
    });
    await user.save();
    return NextResponse.json({ message: "Click" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
