import { NextResponse } from "next/server";
import { addSongToPlaylist, getPlaylist } from "@/app/lib/playlist";
import { searchSpotify } from "@/app/lib/search";
import { getAccessToken } from "@/app/lib/accessToken";
import { getRecentlyPlayed } from "@/app/lib/recentlyPlayed";
import { getCurrentlyPlaying, getProgress } from "@/app/lib/currentlyPlaying";
import { addSongToQueue } from "@/app/lib/queue";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const accessToken = await getAccessToken();
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get("playlistId");

    if (playlistId) {
      const playlist = await getPlaylist(accessToken, playlistId);
      return NextResponse.json({ playlist });
    } else {
      const [recentlyPlayed, currentlyPlaying, progressData] =
        await Promise.all([
          getRecentlyPlayed(accessToken),
          getCurrentlyPlaying(accessToken),
          getProgress(accessToken),
        ]);

      return NextResponse.json({
        recentlyPlayed,
        currentlyPlaying,
        progressData,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { songUri, query, playlistId } = await request.json();
    const accessToken = await getAccessToken();

    if (songUri && playlistId) {
      await addSongToPlaylist(accessToken, playlistId, songUri);
      return NextResponse.json({ message: "Song added to playlist" });
    } else if (songUri) {
      await addSongToQueue(accessToken, songUri);
      return NextResponse.json({ message: "Song added to queue" });
    } else if (query) {
      const searchResults = await searchSpotify(accessToken, query);
      return NextResponse.json(searchResults);
    } else {
      throw new Error("No song URI or search query provided");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
