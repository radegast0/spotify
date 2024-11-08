import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

async function getAccessToken() {
  const refresh_token = process.env.REFRESH_TOKEN;
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
    },
  );
  return response.data.access_token;
}

async function getRecentlyPlayed(accessToken) {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played?",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 8, // Limit the response to the last played song
      },
    },
  );
  return response.data.items;
}

async function getCurrentlyPlaying(accessToken) {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data.item;
}
async function getProgress(accessToken) {
  const response = await axios.get("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const [recentlyPlayed, currentlyPlaying, progressData] = await Promise.all([
      getRecentlyPlayed(accessToken),
      getCurrentlyPlaying(accessToken),
      getProgress(accessToken),
    ]);

    const responseData = { recentlyPlayed, currentlyPlaying, progressData };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
