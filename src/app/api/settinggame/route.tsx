import { ConnectDB } from "@/config/config";
import { GameModel } from "@/models/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const { game, status } = await req.json();
    if (!game || !status) {
      return NextResponse.json("Game or Status is required", { status: 400 });
    }

    const gameModel = new GameModel({
      game: game,
      status: status,
    });

    await gameModel.save();

    return NextResponse.json(gameModel, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await ConnectDB();
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json("Id or Status is required", {
        status: 400,
      });
    }

    const gameModel = await GameModel.findByIdAndUpdate(id, {
      status: status,
    });

    return NextResponse.json(gameModel, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(){
  try {
    await ConnectDB();
    const games = await GameModel.find();
    return NextResponse.json({
      gamesone: games[0].status,
      modpop : games[1].status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
