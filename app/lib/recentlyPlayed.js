import axios from "axios";

export async function getRecentlyPlayed(accessToken) {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 8,
      },
    }
  );

  return response.data.items;
}
