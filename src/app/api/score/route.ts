import { NextResponse } from "next/server";
import { ClickModel ,User} from "../../../models/models";
import { ConnectDB } from "../../../config/config";

export async function POST(req: Request) {
  try {
    const { userID } = await req.json();
    ConnectDB();
    const click= await ClickModel.create({
      user_id: userID,
      date: new Date(),
    });
    const user = await User.findOneAndUpdate(
      { _id: userID },
      { $push: { ClickArry: click._id } }
    )
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await click.save();
    return NextResponse.json({ message: "Click" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    ConnectDB();
    const totalcount = await ClickModel.countDocuments({});
    return NextResponse.json({ total: totalcount }); // Return count as JSON response
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
