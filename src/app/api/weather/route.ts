import { NextRequest, NextResponse } from "next/server";

const apikey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
}
