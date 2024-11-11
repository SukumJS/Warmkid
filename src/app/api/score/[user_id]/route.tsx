import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../../config/config";
import { ClickModel } from "../../../../../models/models";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;
    console.log(user_id);
    await ConnectDB();
    const response = await ClickModel.countDocuments({
      user_id: Object(user_id),
    });
    return NextResponse.json({
      user_id: user_id,
      count: response,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
