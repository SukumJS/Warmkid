"use server";
import { NextResponse } from "next/server";
import { User } from "../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const { phone } = await req.json();
    const user = await User.findOne({ phone});
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
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
