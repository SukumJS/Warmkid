import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../config/config";
import { ClickModel } from "../../../../models/models";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;
    ConnectDB();
    const response = await ClickModel.countDocuments({
      name,
    });
    return NextResponse.json({
      name: name,
      count: response,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
