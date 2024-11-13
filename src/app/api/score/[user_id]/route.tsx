import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../config/config";
import { User } from "../../../../../models/models";

type RouteContext = {
  params: Promise<{ user_id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
  try {
    const { user_id } = await context.params;

    await ConnectDB();
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        user_id: user._id,
        counter: user.ClickArry.length, // Assuming ClickArry is the field for the user's score
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch user score" },
      { status: 500 }
    );
  }
}
