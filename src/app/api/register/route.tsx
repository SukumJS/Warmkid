import { NextResponse } from "next/server";
import { User } from "@/models/models";
import mongoose from "mongoose";
import { ConnectDB } from "@/config/config";

mongoose.set("bufferTimeoutMS", 600000); // Increase timeout to 10 minutes

interface Iuser {
  name: string;
  nickname: string;
  phone: string;
}

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const body = await req.json();
    const { data } = body;
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { status: "error", message: "Invalid data format" },
        { status: 400 }
      );
    }

    const userData = data.map((user: Iuser) => {
      return new User({
        ...user,
      });
    });

    await User.insertMany(userData);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error },
      { status: 500 }
    );
  }
}
