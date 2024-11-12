import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../../config/config";
import { User } from "../../../../../models/models";
export async function GET(
  req: Request,
  { params }: { params: { id : string } }
) {
  try {
    const { id } = params;
    await ConnectDB();
    // const response = await User.findById(user_id)
    // if (!response) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }
    return NextResponse.json({id});

  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
