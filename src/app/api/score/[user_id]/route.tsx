import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../../config/config";
import {User } from "../../../../../models/models";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;
    await ConnectDB();
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      user: {
        user_id : user._id,
        counter: user.ClickArry.length
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
