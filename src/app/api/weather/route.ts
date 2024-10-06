import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "tokyo";
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is configured" },
      { status: 500 },
    );
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        return NextResponse.json(
          { error: "都市が見つかりません。" },
          { status: 404 },
        );
      } else {
        return NextResponse.json(
          { error: "天気データの取得に失敗しました。" },
          { status: error.response.status },
        );
      }
    } else {
      return NextResponse.json(
        { error: "サーバーエラーが発生しました。" },
        { status: 500 },
      );
    }
  }
}
