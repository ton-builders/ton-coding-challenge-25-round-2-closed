import { NextResponse } from "next/server"
import { validate, parse } from "@telegram-apps/init-data-node"

const BOT_TOKEN = "YOUR_TOKEN_HERE"

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization")
    const initData = authHeader

    validate(initData, BOT_TOKEN)

    const parsedInitData = parse(initData)

    return NextResponse.json({
      success: true,
      username: parsedInitData.user?.username || "Unknown",
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Wrong initData" },
      { status: 500 }
    )
  }
}
