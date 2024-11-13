"use server";
import { NextResponse } from "next/server";
import { User } from "../../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const { name } = await req.json();
    const user = await User.create({ name });
    const result = await user.save();
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ConnectDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}
