import { NextResponse } from "next/server";
import { User } from "../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function POST(req: Request) {
  try {
    const { userID, click } = await req.json();
    ConnectDB();
    const filter = { _id: Object(userID) };
    const update = { Clicks: click };
    const user = await User.findByIdAndUpdate(filter, update);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await user.save();
    return NextResponse.json({ message: "saveclick" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
